# Require TF version to be same as or greater than 0.15.0
terraform {
  backend "s3" {
    region         = "us-east-1"
    key            = "core.tfstate"
    dynamodb_table = "aws-locks"
    encrypt        = true
  }
}

# Internal module which defines the VPC
module "vpc" {
  source  = "./modules/vpc"
  region  = var.aws_region
  project = var.project_name
  tags    = local.tags
}
module "bootstrap" {
  source               = "./modules/bootstrap"
  s3_bucket            = var.tf_state_bucket
  dynamo_db_table_name = var.dynamo_db_lock_table_name
  tags                 = local.tags
}

module "site" {
  source = "./modules/eb_rails"
  vpc_id = module.vpc.id
  public_subnets = module.vpc.public_subnet_ids
  private_subnets = module.vpc.private_subnet_ids
  key_pair = aws_key_pair.all["tgarcia_vizzuality"]
}

module "s3_bucket" {
  source = "./modules/s3_bucket"
  bucket = "climatewatch-deploy-packages"
}
