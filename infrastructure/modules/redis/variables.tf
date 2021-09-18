########################
## Variables
########################

variable "project" {
  type        = string
  description = "Project name, used for naming resources"
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC that the REDIS cluster will be created in"
}

variable "redis_cluster_name" {
  type        = string
  description = "Redis cluster name"
}

variable "redis_user_name" {
  type        = string
  description = "Redis user name"
}

variable "redis_user_group" {
  type        = string
  description = "Redis user group name"
  default = "cwusergroup"
}

variable "tags" {
  type        = map(string)
  description = "Tags to add to resources"
}

variable "redis_engine_version" {
  type        = string
  description = "Redis engine version"
  default = "6.x"
}

variable "redis_instance_node_type" {
  type        = string
  description = "Redis instance type class"
  default = "cache.t3.micro"
}

variable "redis_port" {
  type        = string
  description = "Port to access Redis"
  default = 6379
}

variable "vpc_cidr_block" {
  type        = string
  description = "CIDR block of VPC"
}
