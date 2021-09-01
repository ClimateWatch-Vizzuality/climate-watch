locals {
  tags = {
    Project     = var.project_name,
    Environment = var.environment,
    BuiltBy     = "Terraform"
  }
}
