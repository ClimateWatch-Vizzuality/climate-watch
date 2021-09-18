# Output values which can be referenced in other repos
output "account_id" {
  value       = data.aws_caller_identity.current.account_id
  description = "ID of AWS account"
}

output "ec2_instance_ip" {
  value = module.server.ec2_instance_ip
}

output "lb_dns" {
  value = module.load_balancer.lb_dns
}

output "redis_host" {
  value = module.redis.host
}

output "redis_port" {
  value = module.redis.port
}
