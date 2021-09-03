output "ec2_instance_id" {
  value = aws_instance.server.id
}

output "ec2_instance_ip" {
  value = aws_eip.elastic_ip.public_ip
}
