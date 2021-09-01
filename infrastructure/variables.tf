variable "project_name" {
  default     = "climatewatch"
  type        = string
  description = "A project namespace for the infrastructure."
}

variable "environment" {
  type        = string
  description = "An environment namespace for the infrastructure."
}

variable "aws_region" {
  default     = "us-east-1"
  type        = string
  description = "A valid AWS region to configure the underlying AWS SDK."
}

variable "dynamo_db_lock_table_name" {
  default     = "aws-locks"
  type        = string
  description = "Name of the lock table in Dynamo DB"
}

variable "tf_state_bucket" {
  type        = string
  description = "The name of the S3 bucket where the state is stored"
}

variable "allowed_account_id" {
  type        = string
  description = "Allowed AWS Account ID"
}
