variable "project" {
  type        = string
  description = "A project namespace for the infrastructure."
}

variable "region" {
  type        = string
  description = "A valid AWS region to house VPC resources."
}

variable "cidr_block" {
  default     = "10.0.0.0/16" // 10.0.0.0 - 10.0.255.255
  type        = string
  description = "The CIDR range for the entire VPC."
}

variable "public_subnet_cidr_blocks" {
  type = list(string)
  default = [
    "10.0.0.0/18",
    "10.0.64.0/18",
  ]
  description = "A list of CIDR ranges for public subnets."
}

variable "private_subnet_cidr_blocks" {
  type = list(string)
  default = [
    "10.0.128.0/18",
    "10.0.192.0/18"
  ]
  description = "A list of CIDR ranges for private subnets."
}

variable "availability_zones" {
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
  description = "A list of availability zones for subnet placement."
}

variable "tags" {
  default     = {}
  type        = map(string)
  description = "A mapping of keys and values to apply as tags to all resources that support them."
}

variable "private_subnet_tags" {
  default     = {}
  type        = map(string)
  description = "A mapping of keys and values to apply as tags to all private subnets managed by this module."
}

variable "public_subnet_tags" {
  default     = {}
  type        = map(string)
  description = "A mapping of keys and values to apply as tags to all public subnets managed by this module."
}
