# Output values which can be referenced in other repos
output "account_id" {
  value       = data.aws_caller_identity.current.account_id
  description = "ID of AWS account"
}

output "prod_ec2_instance_ip" {
  value = module.prod_server.ec2_instance_ip
}

output "prod_lb_dns" {
  value = module.prod_load_balancer.lb_dns
}

output "prod_lb_certificate_validation_data" {
  value = module.prod_load_balancer.certificate_validation_data
}

output "staging_ec2_instance_ip" {
  value = module.staging_server.ec2_instance_ip
}

output "staging_lb_dns" {
  value = module.staging_load_balancer.lb_dns
}

output "staging_lb_certificate_validation_data" {
  value = module.staging_load_balancer.certificate_validation_data
}

output "redis_host" {
  value = module.redis.host
}

output "redis_port" {
  value = module.redis.port
}

# Point the www.climatewatchdata.org DNS record here to send production traffic through CloudFront
output "prod_cloudfront_domain" {
  value = try(aws_cloudfront_distribution.environment["production"].domain_name, null)
}

# Point staging DNS here only after the app fix and private CloudFront checks pass.
output "staging_cloudfront_domain" {
  value = aws_cloudfront_distribution.environment["staging"].domain_name
}
