########################
## Cluster
########################

module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 3.0"

  identifier                  = "${var.project}-postgresql-db"
  allow_major_version_upgrade = true

  engine            = "postgres"
  engine_version    = var.rds_engine_version
  instance_class    = var.rds_instance_class
  allocated_storage = 20

  username = var.rds_user_name
  password = random_password.postgresql_superuser.result
  port     = var.rds_port

  vpc_security_group_ids = [aws_security_group.postgresql.id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  tags = merge(
    {
      Name = "${var.project}-PostgreSQL-DB"
    },
    var.tags
  )

  # DB subnet group
  subnet_ids = var.private_subnet_ids

  # DB parameter group
  family = "postgres13"

  # DB option group
  major_engine_version = "13"

  # Database Deletion Protection
  deletion_protection = true
}

resource "random_password" "postgresql_superuser" {
  length  = 16
  special = false
}


#####################
# Security Groups
#####################


# Allow access to aurora to all resources which are in the same security group

resource "aws_security_group" "postgresql" {
  vpc_id                 = var.vpc_id
  description            = "Security Group for PostgreSQL DB"
  name                   = "PostgreSQL-ingress"
  revoke_rules_on_delete = true
  tags = merge(
    {
      Name = "RDS SG"
    },
    var.tags
  )
}


resource "aws_security_group_rule" "postgresql_ingress" {
  type              = "ingress"
  from_port         = var.rds_port
  to_port           = var.rds_port
  protocol          = "tcp"
  cidr_blocks       = [var.vpc_cidr_block]
  security_group_id = aws_security_group.postgresql.id
}

####################
# Secret Manager
####################

resource "aws_secretsmanager_secret" "postgresql-admin" {
  description = "Connection string for PostgreSQL cluster"
  name        = "${var.project}-postgresql-admin-password"
  tags        = var.tags
}

resource "aws_secretsmanager_secret_version" "postgresql-admin" {

  secret_id = aws_secretsmanager_secret.postgresql-admin.id
  secret_string = jsonencode({
    "username" = var.rds_user_name,
    "engine"   = "postgresql",
    "dbname"   = var.rds_db_name,
    "host"     = module.db.db_instance_address
    "password" = random_password.postgresql_superuser.result,
    "port"     = var.rds_port,
  })
}

data "template_file" "secrets_postgresql-writer" {
  template = file("${path.module}/iam_policy_secrets_read.json.tpl")
  vars = {
    secret_arn = aws_secretsmanager_secret.postgresql-admin.arn
  }
}

resource "aws_iam_policy" "secrets_postgresql-writer" {
  name   = "${var.project}-secrets-postgresql-writer"
  policy = data.template_file.secrets_postgresql-writer.rendered
}
