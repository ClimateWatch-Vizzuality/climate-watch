resource "aws_security_group" "lb_access_sg" {
  vpc_id      = var.vpc_id
  name        = "lb_access_sg-${var.environment}"
  description = "SG allowing access from the LB"

  tags = merge(
    {
      Name = "ALB SG"
    },
    var.tags
  )
}

resource "aws_security_group_rule" "lb_access_http_ingress" {
  type              = "ingress"
  from_port         = "80"
  to_port           = "80"
  protocol          = "TCP"
  security_group_id = aws_security_group.lb_access_sg.id
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "lb_access_https_ingress" {
  type              = "ingress"
  from_port         = "443"
  to_port           = "443"
  protocol          = "TCP"
  security_group_id = aws_security_group.lb_access_sg.id
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "lb_access_all_egress" {
  type              = "egress"
  from_port         = "0"
  to_port           = "0"
  protocol          = "all"
  security_group_id = aws_security_group.lb_access_sg.id
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_alb" "site_lb" {
  name                       = "site-lb-${var.environment}"
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.lb_access_sg.id]
  enable_http2               = true
  subnets                    = var.subnet_ids
  enable_deletion_protection = true
}

resource "aws_lb_listener" "site_lb_listener" {
  load_balancer_arn = aws_alb.site_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
      host        = "www.climatewatchdata.org"
    }
  }
}

resource "aws_lb_listener" "site_lb_listener_https" {
  load_balancer_arn = aws_alb.site_lb.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate.domain_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.site_lb_tg.arn
  }
}

resource "aws_lb_target_group" "site_lb_tg" {
  name     = "site-lb-tg-${var.environment}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

resource "aws_lb_target_group_attachment" "site_lb_target_group_attachment" {
  target_group_arn = aws_lb_target_group.site_lb_tg.arn
  target_id        = var.ec2_target_id
  port             = 80
}

resource "aws_alb_listener_certificate" "alb_listener_certificate" {
  listener_arn = aws_lb_listener.site_lb_listener_https.arn
  certificate_arn = aws_acm_certificate_validation.domain_cert_validation.certificate_arn
}

resource "aws_acm_certificate" "domain_cert" {
  domain_name       = var.domain
  subject_alternative_names = var.alt_domains
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "domain_cert_validation" {
  certificate_arn = aws_acm_certificate.domain_cert.arn
}
