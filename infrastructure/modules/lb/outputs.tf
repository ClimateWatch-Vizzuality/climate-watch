output "lb_security_group_id" {
  value = aws_security_group.lb_access_sg.id
}

output "lb_listener_http_arn" {
  value = aws_lb_listener.site_lb_listener.arn
}

output "lb_listener_https_arn" {
  value = aws_lb_listener.site_lb_listener_https.arn
}

output "lb_dns" {
  value = aws_alb.site_lb.dns_name
}

output "certificate_validation_data" {
  value = aws_acm_certificate.domain_cert.domain_validation_options
}
