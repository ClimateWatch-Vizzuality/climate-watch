output "security_group_id" {
  value       = aws_security_group.redis.id
  description = "Security group ID to access redis"
}

output "host" {
  value = aws_elasticache_cluster.redis_cluster.cache_nodes[0].address
}

output "port" {
  value = aws_elasticache_cluster.redis_cluster.cache_nodes[0].port
}
