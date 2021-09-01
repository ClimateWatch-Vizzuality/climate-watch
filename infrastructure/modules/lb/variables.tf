variable "project" {
  type        = string
  description = "Project name, used for naming resources"
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC that the LB will be created in"
}

//variable "source_security_group_id" {
//  type        = string
//  description = "The ID of the source Security Group"
//}

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
