resource "aws_elasticache_cluster" "redis_cluster" {
  cluster_id           = var.redis_cluster_name
  engine               = "redis"
  node_type            = var.redis_instance_node_type
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  engine_version       = var.redis_engine_version
  port                 = var.redis_port
  security_group_ids = [aws_security_group.redis.id]
}

resource "aws_security_group" "redis" {
  vpc_id                 = var.vpc_id
  description            = "Security Group for Redis"
  name                   = "Redis-ingress"
  revoke_rules_on_delete = true
  tags = merge(
  {
    Name = "Redis SG"
  },
  var.tags
  )
}

resource "aws_security_group_rule" "redis_ingress" {
  type              = "ingress"
  from_port         = var.redis_port
  to_port           = var.redis_port
  protocol          = "tcp"
  cidr_blocks       = [var.vpc_cidr_block]
  security_group_id = aws_security_group.redis.id
}
