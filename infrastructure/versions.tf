terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.56"
    }
    template = {
      source = "hashicorp/template"
    }
  }
  required_version = "1.0.5"
}

provider "aws" {
  region              = var.aws_region
  allowed_account_ids = [var.allowed_account_id]
}
