output "lb_security_group_id" {
  value = aws_security_group.lb_access_sg.id
}

output "lb_dns" {
  value = aws_alb.site_lb.dns_name
}
