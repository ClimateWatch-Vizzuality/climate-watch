# Create elastic beanstalk application


resource "aws_elastic_beanstalk_application" "eb_app" {
  name = var.application_name
}

resource "aws_iam_role" "ec2_profile_role" {
  name = "ec2_profile_role"

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
EOF
}

resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "ec2_profile_role"
  role = aws_iam_role.ec2_profile_role.name
}

resource "aws_elastic_beanstalk_environment" "eb_app_production" {
  name                = "${var.application_name}-production"
  application         = aws_elastic_beanstalk_application.eb_app.name
  solution_stack_name = "64bit Amazon Linux 2018.03 v2.12.10 running Ruby 2.5 (Puma)"

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = var.vpc_id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "AssociatePublicIpAddress"
    value     =  "true"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", var.private_subnets)
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "ELBSubnets"
    value     = join(",", var.public_subnets)
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "DBSubnets"
    value     = join(",", var.private_subnets)
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "ELBScheme"
    value     = "internet facing"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     =  aws_iam_instance_profile.ec2_instance_profile.name
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "EC2KeyName"
    value     =  var.key_pair.key_name
  }

  setting {
    namespace = "aws:ec2:instances"
    name      = "InstanceTypes"
    value     = "m5a.large"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "MatcherHTTPCode"
    value     = "200"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "LoadBalancerType"
    value     = "application"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = 1
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = 1
  }

  setting {
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    name      = "SystemType"
    value     = "enhanced"
  }

  #RDS config
  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBEngine"
    value     = "postgres"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBEngineVersion"
    value     = "13.3"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBInstanceClass"
    value     = "db.t2.micro"
  }

  setting {
    namespace = "aws:rds:dbinstance"
    name      = "DBAllocatedStorage"
    value     = 5
  }

}
