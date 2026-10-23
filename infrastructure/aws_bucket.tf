#
# Shared bucket for Climate Watch's AWS operations (logs and similar), one folder per use
#
resource "aws_s3_bucket" "climatewatch_aws" {
  bucket = "wri-climatewatch-aws"

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
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
