#
# Snapshots of the production server's disk: daily kept 7 days, weekly kept 5 weeks,
# monthly kept 13 months
# (RDS has its own backups; this covers the server: .env, gems, assets, OS config)
#
data "aws_iam_policy_document" "dlm_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["dlm.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "dlm" {
  name               = "${var.project_name}-dlm"
  assume_role_policy = data.aws_iam_policy_document.dlm_assume_role.json
  tags               = local.tags
}

resource "aws_iam_role_policy_attachment" "dlm" {
  role       = aws_iam_role.dlm.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSDataLifecycleManagerServiceRole"
}

locals {
  # Every schedule adds the same tag so DLM's snapshots are easy to tell apart
  dlm_schedule_tags = [{ Key = "SnapshotCreator", Value = "DLM" }]
}

# AWS provider 3.x can't express weekly or monthly schedules (no cron_expression),
# so the policy is a CloudFormation stack. Move it to aws_dlm_lifecycle_policy after
# upgrading the provider.
resource "aws_cloudformation_stack" "production_server_snapshots" {
  name = "${var.project_name}-production-server-snapshots"
  template_body = jsonencode({
    Resources = {
      Policy = {
        Type = "AWS::DLM::LifecyclePolicy"
        Properties = {
          Description      = "${var.project_name} production server snapshots daily weekly monthly"
          ExecutionRoleArn = aws_iam_role.dlm.arn
          State            = "ENABLED"
          PolicyDetails = {
            ResourceTypes = ["VOLUME"]
            # The production root volume's Name tag, set by the server module
            TargetTags = [{ Key = "Name", Value = "${var.project_name}-server-production" }]
            Schedules = [
              {
                Name       = "daily"
                CopyTags   = true
                CreateRule = { Interval = 24, IntervalUnit = "HOURS", Times = ["07:00"] }
                RetainRule = { Count = 7 }
                TagsToAdd  = local.dlm_schedule_tags
              },
              {
                Name       = "weekly"
                CopyTags   = true
                CreateRule = { CronExpression = "cron(0 7 ? * SUN *)" } # Sundays
                RetainRule = { Count = 5 }
                TagsToAdd  = local.dlm_schedule_tags
              },
              {
                Name       = "monthly"
                CopyTags   = true
                CreateRule = { CronExpression = "cron(0 7 1 * ? *)" } # the 1st of each month
                RetainRule = { Count = 13 }
                TagsToAdd  = local.dlm_schedule_tags
              },
            ]
          }
        }
      }
    }
  })
  tags = local.tags
}
