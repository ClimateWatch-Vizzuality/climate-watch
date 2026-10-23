#
# IAM role for both servers: lets the CloudWatch agent send memory and disk metrics,
# and Systems Manager install and run it (and open Session Manager shells)
#
data "aws_iam_policy_document" "server_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "server" {
  name               = "${var.project_name}-server"
  assume_role_policy = data.aws_iam_policy_document.server_assume_role.json
  tags               = local.tags
}

resource "aws_iam_role_policy_attachment" "server_cloudwatch_agent" {
  role       = aws_iam_role.server.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
}

resource "aws_iam_role_policy_attachment" "server_ssm" {
  role       = aws_iam_role.server.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "server" {
  name = "${var.project_name}-server"
  role = aws_iam_role.server.name
}

# CloudWatch agent configuration; the agent reads it from Parameter Store
# (CloudWatchAgentServerPolicy allows reading AmazonCloudWatch-* parameters)
resource "aws_ssm_parameter" "cloudwatch_agent_config" {
  name = "AmazonCloudWatch-${var.project_name}"
  type = "String"
  value = jsonencode({
    agent = {
      metrics_collection_interval = 60
    }
    metrics = {
      append_dimensions = {
        InstanceId = "$${aws:InstanceId}"
      }
      metrics_collected = {
        mem = {
          measurement = ["mem_used_percent"]
        }
        swap = {
          measurement = ["swap_used_percent"]
        }
        disk = {
          measurement = ["used_percent"]
          resources   = ["/"]
        }
      }
    }
  })
  tags = local.tags
}
