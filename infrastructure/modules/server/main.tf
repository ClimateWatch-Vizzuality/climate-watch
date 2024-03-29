#
# Site Server Security Groups
# SSH access to and from the world
# HTTP access to the ALB
#
resource "aws_security_group" "site_server_ssh_security_group" {
  vpc_id      = var.vpc.id
  name        = "public-ssh-sg-${var.environment}"
  description = "Security group for SSH access to and from the world - ${var.environment}"

  tags = merge(
    {
      Name = "EC2 SSH access SG"
    },
    var.tags
  )

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group_rule" "ssh_ingress" {
  type      = "ingress"
  from_port = 22
  to_port   = 22
  protocol  = "tcp"
  cidr_blocks = [
  "0.0.0.0/0"]
  security_group_id = aws_security_group.site_server_ssh_security_group.id
}

resource "aws_security_group_rule" "ssh_egress" {
  type      = "egress"
  from_port = 22
  to_port   = 22
  protocol  = "tcp"
  cidr_blocks = [
  var.vpc.cidr_block]

  security_group_id = aws_security_group.site_server_ssh_security_group.id
}


resource "aws_security_group" "site_server_http_security_group" {
  vpc_id      = var.vpc.id
  name        = "private-http-sg-${var.environment}"
  description = "Security group for HTTP access within the VPC - ${var.environment}"

  tags = merge(
    {
      Name = "EC2 HTTP access SG"
    },
    var.tags
  )

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group_rule" "http_ingress" {
  type      = "ingress"
  from_port = 80
  to_port   = 80
  protocol  = "tcp"

  source_security_group_id = var.lb_security_group_id

  security_group_id = aws_security_group.site_server_http_security_group.id
}

resource "aws_security_group" "site_server_world_egress_security_group" {
  vpc_id      = var.vpc.id
  name        = "world-egress-sg-${var.environment}"
  description = "Security group for access to the www - ${var.environment}"

  tags = merge(
    {
      Name = "EC2 Egress SG"
    },
    var.tags
  )

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_security_group_rule" "world_egress" {
  type      = "egress"
  from_port = 0
  to_port   = 0
  protocol  = "-1"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = aws_security_group.site_server_world_egress_security_group.id
}

resource "aws_instance" "server" {
  ami               = var.site_server_ami
  availability_zone = var.availability_zone
  ebs_optimized     = true
  instance_type     = var.site_server_instance_type
  monitoring        = true
  vpc_security_group_ids = concat([
    aws_security_group.site_server_ssh_security_group.id,
    aws_security_group.site_server_http_security_group.id,
    aws_security_group.site_server_world_egress_security_group.id], var.security_group_ids)
  associate_public_ip_address = true
  user_data                   = var.user_data

  lifecycle {
    ignore_changes = [
      ami,
    user_data]
  }

  tags = merge(
    {
      Name = "${var.project}-server-${var.environment}"
    },
    var.tags
  )
}

resource "aws_ebs_volume" "root_volume" {
  availability_zone = var.availability_zone
  size              = 32

  tags = {
    Name = "${var.project}-server-${var.environment}"
  }
}

resource "aws_volume_attachment" "root_volume_attachment" {
  device_name = "/dev/sda1"
  volume_id   = aws_ebs_volume.root_volume.id
  instance_id = aws_instance.server.id
}

resource "aws_eip" "elastic_ip" {
  instance = aws_instance.server.id
  vpc      = true
  tags = merge(
  {
    Name = "${var.project}-ip-${var.environment}"
  },
  var.tags
  )
}
