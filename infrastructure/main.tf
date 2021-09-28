# Require TF version to be same as or greater than 0.15.0
terraform {
  backend "s3" {
    region = "us-east-1"
    key    = "core.tfstate"
    //    dynamodb_table = "aws-locks"
    encrypt = true
  }
}

data "aws_vpc" "default_vpc" {
  default = true
}

data "aws_subnet_ids" "subnet_ids" {
  vpc_id = data.aws_vpc.default_vpc.id
}

module "bootstrap" {
  source               = "./modules/bootstrap"
  s3_bucket            = var.tf_state_bucket
  dynamo_db_table_name = var.dynamo_db_lock_table_name
  tags                 = local.tags
}

resource "aws_security_group" "postgresql_access" {
  vpc_id      = data.aws_vpc.default_vpc.id
  description = "SG allowing access to the Postgres SG"

  tags = merge(
    {
      Name = "EC2 SG to access RDS"
    },
    local.tags
  )
}

resource "aws_security_group_rule" "port_forward_postgres" {
  type                     = "egress"
  from_port                = module.postgresql.port
  to_port                  = module.postgresql.port
  protocol                 = "-1"
  source_security_group_id = module.postgresql.security_group_id
  security_group_id        = aws_security_group.postgresql_access.id
}

resource "aws_security_group" "redis_access" {
  vpc_id      = data.aws_vpc.default_vpc.id
  description = "SG allowing access to the Redis SG"

  tags = merge(
    {
      Name = "EC2 SG to access Redis"
    },
    local.tags
  )
}

resource "aws_security_group_rule" "port_forward_redis" {
  type                     = "egress"
  from_port                = module.redis.port
  to_port                  = module.redis.port
  protocol                 = "-1"
  source_security_group_id = module.redis.security_group_id
  security_group_id        = aws_security_group.redis_access.id
}

module "postgresql" {
  source = "./modules/postgresql"

  log_retention_period        = var.rds_log_retention_period
  subnet_ids                  = data.aws_subnet_ids.subnet_ids.ids
  project                     = var.project_name
  rds_backup_retention_period = var.rds_backup_retention_period
  rds_user_name               = "postgres"
  rds_engine_version          = var.rds_engine_version
  rds_instance_class          = var.rds_instance_class
  rds_instance_count          = var.rds_instance_count
  tags                        = local.tags
  vpc_id                      = data.aws_vpc.default_vpc.id
  rds_port                    = 5432
  vpc_cidr_block              = data.aws_vpc.default_vpc.cidr_block
}

module "redis" {
  source = "./modules/redis"

  redis_cluster_name = "sidekiq"
  redis_user_name = "sidekiq"
  project                     = var.project_name
  tags                        = local.tags
  vpc_id                      = data.aws_vpc.default_vpc.id
  vpc_cidr_block              = data.aws_vpc.default_vpc.cidr_block
}

module "prod_server" {
  source                    = "./modules/server"
  project                   = var.project_name
  environment = "production"
  region                    = var.aws_region
  tags                      = local.tags
  vpc                       = data.aws_vpc.default_vpc
  user_data                 = data.template_file.server_setup.rendered
  site_server_ami           = data.aws_ami.latest-ubuntu-lts.id
  availability_zone         = "us-east-1a"
  security_group_ids        = [aws_security_group.postgresql_access.id, aws_security_group.redis_access.id]
  lb_security_group_id      = module.prod_load_balancer.lb_security_group_id
  site_server_instance_type = "m5a.large"
}

module "prod_load_balancer" {
  source        = "./modules/lb"
  vpc_id        = data.aws_vpc.default_vpc.id
  subnet_ids    = data.aws_subnet_ids.subnet_ids.ids
  project       = var.project_name
  environment = "production"
  ec2_target_id = module.prod_server.ec2_instance_id
  domain        = "climatewatchdata.org"
  alt_domains   = ["beta.climatewatchdata.org", "climatewatchdata.org", "www.climatedata.org", "climatedata.org"]
}

resource "aws_lb_listener_rule" "prod_redirect_domains" {
  listener_arn = module.prod_load_balancer.lb_listener_arn
  priority     = 100

  action {
    type = "redirect"
    redirect {
      status_code = "HTTP_301"
      protocol = "HTTPS"
      host        = "www.climatewatchdata.org"
    }
  }

  condition {
    host_header {
      values = ["beta.climatewatchdata.org", "climatewatchdata.org", "www.climatedata.org", "climatedata.org"]
    }
  }
}

module "staging_server" {
  source                    = "./modules/server"
  project                   = var.project_name
  environment = "staging"
  region                    = var.aws_region
  tags                      = local.tags
  vpc                       = data.aws_vpc.default_vpc
  user_data                 = data.template_file.server_setup.rendered
  site_server_ami           = data.aws_ami.latest-ubuntu-lts.id
  availability_zone         = "us-east-1a"
  security_group_ids        = [aws_security_group.postgresql_access.id, aws_security_group.redis_access.id]
  lb_security_group_id      = module.prod_load_balancer.lb_security_group_id
  site_server_instance_type = "m5a.large"
}

module "staging_load_balancer" {
  source        = "./modules/lb"
  vpc_id        = data.aws_vpc.default_vpc.id
  subnet_ids    = data.aws_subnet_ids.subnet_ids.ids
  environment = "staging"
  project       = var.project_name
  ec2_target_id = module.staging_server.ec2_instance_id
  domain        = "staging.climatewatchdata.org"
}
