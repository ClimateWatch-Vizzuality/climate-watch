variable "application_name" {
  type = string
  default = "climatewatch"
}

variable "vpc_id" {}

variable "public_subnets" {}

variable "private_subnets" {}

variable "key_pair" {}

variable "appsignal_api_key" {
  type = string
  sensitive   = true
}
