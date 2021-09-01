data "aws_caller_identity" "current" {}

data "aws_ami" "latest-ubuntu-lts" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# User data script to bootstrap authorized ssh keys
data "template_file" "server_setup" {
  template = file("${path.module}/templates/server_setup.sh.tpl")
  vars = {
    user     = "ubuntu"
    hostname = "climatewatch"
    authorized_ssh_keys = <<EOT
%{for row in formatlist("echo \"%v\" >> /home/ubuntu/.ssh/authorized_keys",
values(aws_key_pair.all)[*].public_key)~}
${row}
%{endfor~}
EOT
}
}
