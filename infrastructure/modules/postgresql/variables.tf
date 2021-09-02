########################
## Variables
########################

variable "project" {
  type        = string
  description = "Project name, used for naming resources"
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC that the RDS cluster will be created in"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "The ID's of the VPC subnets that the RDS cluster instances will be created in"
}

variable "rds_user_name" {
  type        = string
  description = "RDS master user name"
}

variable "rds_backup_retention_period" {
  type        = number
  description = "Retention period for backup files"
}

variable "tags" {
  type        = map(string)
  description = "Tags to add to resources"
}

variable "availability_zone_names" {
  type        = list(string)
  description = "List of availability zone names for RDS cluster"
}

variable "log_retention_period" {
  type        = number
  description = "Number of days to retain logs in Cloud Watch"
}

variable "rds_db_name" {
  type        = string
  description = "RDS Database Name"
}

variable "rds_engine_version" {
  type        = string
  description = "RDS Database engine version"
}

variable "rds_instance_count" {
  type        = number
  description = "Number of permanent RDS instances"
}

variable "rds_instance_class" {
  type        = string
  description = "RDS instance type class"
}

variable "rds_port" {
  type        = string
  description = "Port to access RDS database"
}

variable "vpc_cidr_block" {
  type        = string
  description = "CIDR block of VPC"
}
