#
# CloudWatch alarms for production, notifying an SNS topic
#
resource "aws_sns_topic" "alarms" {
  name = "${var.project_name}-alarms"
  tags = local.tags
}

resource "aws_sns_topic_subscription" "alarm_emails" {
  for_each  = toset(var.alarm_emails)
  topic_arn = aws_sns_topic.alarms.arn
  protocol  = "email"
  endpoint  = each.value
}

locals {
  alarm_actions = [aws_sns_topic.alarms.arn]
}

resource "aws_cloudwatch_metric_alarm" "production_cpu" {
  alarm_name          = "${var.project_name}-production-cpu-high"
  alarm_description   = "Production server CPU above 80% for 15 minutes"
  namespace           = "AWS/EC2"
  metric_name         = "CPUUtilization"
  dimensions          = { InstanceId = module.prod_server.ec2_instance_id }
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 3
  comparison_operator = "GreaterThanThreshold"
  threshold           = 80
  alarm_actions       = local.alarm_actions
  ok_actions          = local.alarm_actions
  tags                = local.tags
}

resource "aws_cloudwatch_metric_alarm" "production_unhealthy_hosts" {
  alarm_name        = "${var.project_name}-production-unhealthy-host"
  alarm_description = "The production load balancer's health check has failed for 5 minutes"
  namespace         = "AWS/ApplicationELB"
  metric_name       = "UnHealthyHostCount"
  dimensions = {
    LoadBalancer = module.prod_load_balancer.lb_arn_suffix
    TargetGroup  = module.prod_load_balancer.target_group_arn_suffix
  }
  statistic           = "Maximum"
  period              = 60
  evaluation_periods  = 5
  comparison_operator = "GreaterThanOrEqualToThreshold"
  threshold           = 1
  alarm_actions       = local.alarm_actions
  ok_actions          = local.alarm_actions
  tags                = local.tags
}

resource "aws_cloudwatch_metric_alarm" "production_response_time" {
  alarm_name          = "${var.project_name}-production-slow-responses"
  alarm_description   = "95th percentile response time above 10 seconds for 15 minutes; p95 is often above 5 s, which is tracked separately"
  namespace           = "AWS/ApplicationELB"
  metric_name         = "TargetResponseTime"
  dimensions          = { LoadBalancer = module.prod_load_balancer.lb_arn_suffix }
  extended_statistic  = "p95"
  period              = 300
  evaluation_periods  = 3
  comparison_operator = "GreaterThanThreshold"
  threshold           = 10
  treat_missing_data  = "notBreaching"
  alarm_actions       = local.alarm_actions
  ok_actions          = local.alarm_actions
  tags                = local.tags
}

resource "aws_cloudwatch_metric_alarm" "production_5xx" {
  alarm_name          = "${var.project_name}-production-5xx"
  alarm_description   = "More than 25 server errors (5xx from the app) in each of 3 consecutive 5-minute periods"
  namespace           = "AWS/ApplicationELB"
  metric_name         = "HTTPCode_Target_5XX_Count"
  dimensions          = { LoadBalancer = module.prod_load_balancer.lb_arn_suffix }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 3
  comparison_operator = "GreaterThanThreshold"
  threshold           = 25
  treat_missing_data  = "notBreaching"
  alarm_actions       = local.alarm_actions
  ok_actions          = local.alarm_actions
  tags                = local.tags
}

resource "aws_cloudwatch_metric_alarm" "rds_cpu_credits" {
  alarm_name          = "${var.project_name}-rds-cpu-credits-low"
  alarm_description   = "RDS CPU credit balance below 100 (the t3 instance will be throttled when it runs out)"
  namespace           = "AWS/RDS"
  metric_name         = "CPUCreditBalance"
  dimensions          = { DBInstanceIdentifier = module.postgresql.identifier }
  statistic           = "Minimum"
  period              = 300
  evaluation_periods  = 1
  comparison_operator = "LessThanThreshold"
  threshold           = 100
  alarm_actions       = local.alarm_actions
  ok_actions          = local.alarm_actions
  tags                = local.tags
}

resource "aws_cloudwatch_metric_alarm" "rds_memory" {
  alarm_name          = "${var.project_name}-rds-memory-low"
  alarm_description   = "RDS freeable memory below 200 MB for 15 minutes"
  namespace           = "AWS/RDS"
  metric_name         = "FreeableMemory"
  dimensions          = { DBInstanceIdentifier = module.postgresql.identifier }
  statistic           = "Average"
  period              = 300
  evaluation_periods  = 3
  comparison_operator = "LessThanThreshold"
  threshold           = 200 * 1024 * 1024
  alarm_actions       = local.alarm_actions
  ok_actions          = local.alarm_actions
  tags                = local.tags
}
