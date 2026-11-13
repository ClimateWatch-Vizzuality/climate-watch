variable "project" {
  type        = string
  description = "A project namespace for the infrastructure."
}

variable "environment" {
  type        = string
  description = "The name of the environment this server hosts"
}

variable "region" {
  type        = string
  description = "A valid AWS region to house VPC resources."
}

variable "vpc" {
  type = object({
    id         = string
    cidr_block = string
  })
  description = "VPC to which the site server will belong"
}

variable "availability_zone" {
  type        = string
  description = "The availability zone for subnet placement."
}

variable "site_server_ami" {
  type        = string
  description = "An AMI ID for the site server."
}

variable "site_server_instance_type" {
  default     = "t3.micro"
  type        = string
  description = "An instance type for the site server."
}

variable "tags" {
  default     = {}
  type        = map(string)
  description = "A mapping of keys and values to apply as tags to all resources that support them."
}

variable "user_data" {
  type        = string
  description = "User data for bootstrapping the site server"
}

variable "security_group_ids" {
  type        = list(string)
  description = "A list of security groups to use for the site server"
  default     = []
}

variable "lb_security_group_id" {
  type = string
}

# Defaults match the production server. The staging server was built by hand in June 2026,
# so it overrides them to match what's running.
variable "server_name" {
  type        = string
  default     = null
  description = "Name tag for the instance (default: <project>-server-<environment>)"
}

variable "ebs_optimized" {
  type    = bool
  default = true
}

variable "monitoring" {
  type        = bool
  default     = true
  description = "Detailed (1-minute) CloudWatch monitoring"
}

variable "root_volume_size" {
  type    = number
  default = 32
}

variable "root_volume_name_tag" {
  type        = bool
  default     = true
  description = "Whether to set a Name tag on the root volume"
}

variable "instance_shared_tags" {
  type        = bool
  default     = true
  description = "Whether to add var.tags to the instance (security groups and the EIP always get them)"
}

variable "iam_instance_profile" {
  type        = string
  default     = null
  description = "IAM instance profile to attach to the server"
}
