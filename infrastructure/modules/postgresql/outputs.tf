output "security_group_id" {
  value       = aws_security_group.postgresql.id
  description = "Security group ID to access postgresql database"
}

output "postgresql-password-secret-arn" {
  value = aws_secretsmanager_secret.postgresql-admin.arn
}

output "postgresql-password-secret-version-arn" {
  value = aws_secretsmanager_secret_version.postgresql-admin.arn
}

output "username" {
  value     = module.db.db_instance_username
  sensitive = true
}

output "host" {
  value = module.db.db_instance_address
}

output "port" {
  value = module.db.db_instance_port
}
