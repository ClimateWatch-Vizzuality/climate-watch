variable "project" {
  type        = string
  description = "Project name, used for naming resources"
}

variable "environment" {
  type        = string
  description = "The name of the environment this server hosts"
}

variable "domain" {
  type        = string
  description = "The domain to attach to the certificate"
}

variable "default_certificate_arn" {
  type        = string
  default     = null
  description = "ACM certificate to use as the HTTPS listener's default, instead of the one this module creates"
}

variable "listener_certificate_arn" {
  type        = string
  default     = null
  description = "ACM certificate to add to the HTTPS listener alongside the default, instead of the one this module creates"
}

variable "alt_domains" {
  type        = list(string)
  description = "Alternative domains to attach to the certificate"
  default = []
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC that the LB will be created in"
}

variable "ec2_target_id" {
  type        = string
  description = "The ID of the target EC2 instance"
}

variable "subnet_ids" {
  type        = list(string)
  description = "The ID's of the VPC subnets that the LB will be created in"
}

variable "tags" {
  default     = {}
  type        = map(string)
  description = "A mapping of keys and values to apply as tags to all resources that support them."
}
