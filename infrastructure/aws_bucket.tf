#
# Shared bucket for Climate Watch's AWS operations (logs and similar), one folder per use:
#   alb-logs/  load balancer access logs, kept for 90 days
#
resource "aws_s3_bucket" "climatewatch_aws" {
  bucket = "wri-climatewatch-aws"

  # Load balancers can only write to buckets encrypted with S3-managed keys
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle_rule {
    id      = "expire-alb-logs"
    enabled = true
    prefix  = "alb-logs/"

    expiration {
      days = 90
    }
  }

  tags = local.tags
}

resource "aws_s3_bucket_public_access_block" "climatewatch_aws" {
  bucket                  = aws_s3_bucket.climatewatch_aws.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Load balancers in us-east-1 deliver logs as AWS account 127311923021
data "aws_iam_policy_document" "climatewatch_aws" {
  statement {
    sid       = "AlbAccessLogs"
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.climatewatch_aws.arn}/alb-logs/*/AWSLogs/${data.aws_caller_identity.current.account_id}/*"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::127311923021:root"]
    }
  }
}

resource "aws_s3_bucket_policy" "climatewatch_aws" {
  bucket = aws_s3_bucket.climatewatch_aws.id
  policy = data.aws_iam_policy_document.climatewatch_aws.json

  # Both write the bucket's settings, so apply them one at a time
  depends_on = [aws_s3_bucket_public_access_block.climatewatch_aws]
}
