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

//- name: POSTGRES_URL
//valueFrom:
//secretKeyRef:
//key: CW_POSTGRES_URL
//name: dbsecrets
//- name: SHARED_POSTGRES_URL
//valueFrom:
//secretKeyRef:
//key: CW_SHARED_POSTGRES_URL
//name: dbsecrets
//- name: AWS_ACCESS_KEY_ID
//valueFrom:
//secretKeyRef:
//key: CW_PLATFORMS_S3_ACCESS_KEY
//name: appsecrets
//- name: AWS_SECRET_ACCESS_KEY
//valueFrom:
//secretKeyRef:
//key: CW_PLATFORMS_S3_SECRET_ACCESS_KEY
//name: appsecrets


# Secrets for env vars
resource "aws_secretsmanager_secret" "appsignal_api_key" {
  name        = "AppSignal API key"
}

resource "aws_secretsmanager_secret_version" "appsignal_api_key" {
  secret_id = aws_secretsmanager_secret.appsignal_api_key.id
  secret_string = var.appsignal_api_key
}

resource "aws_secretsmanager_secret" "appsignal_api_key" {
  name        = "AppSignal API key"
}

resource "aws_secretsmanager_secret_version" "appsignal_api_key" {
  secret_id = aws_secretsmanager_secret.appsignal_api_key.id
  secret_string = var.appsignal_api_key
}



resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "ec2_profile_role"
  role = aws_iam_role.ec2_profile_role.name
}

resource "aws_elastic_beanstalk_environment" "eb_app_production" {
  name                = "${var.application_name}-production"
  application         = aws_elastic_beanstalk_application.eb_app.name
  solution_stack_name = "64bit Amazon Linux 2018.03 v2.12.10 running Ruby 2.5 (Puma)"

  # Actual application env vars
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "REDIS_SERVER"
    value     = "redis://localhost:6379"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "CORS_WHITELIST"
    value     = "*"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "GFW_API"
    value     = "https://production-api.globalforestwatch.org"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "ESP_API"
    value     = "https://data.emissionspathways.org/api/v1"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "AWS_REGION"
    value     = "eu-west-1"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "S3_BUCKET_NAME"
    value     = "wri-sites"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RAILS_LOG_TO_STDOUT"
    value     = "true"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "PASSWORD_PROTECT"
    value     = "false"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RAILS_SERVE_STATIC_FILES"
    value     = "true"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "PORT"
    value     = 3000
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "CW_FILES_PREFIX"
    value     = "climatewatch.org/www.climatewatch.org/climate-watch/"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RAILS_ENV"
    value     = "production"
  }
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "RACK_ENV"
    value     = "production"
  }

  # Beanstalk settings
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
    value     = join(",", concat(var.private_subnets,var.public_subnets))
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
