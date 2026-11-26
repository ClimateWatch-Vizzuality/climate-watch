# CloudFront for staging first, then production.
# Both environments use the same pass-through configuration: no caching, with all
# visitor headers, cookies and query strings forwarded to their own load balancer.
#
# Staging requests the $0 Free flat-rate plan; production requests Pro ($15/month).
# These are per-distribution subscriptions, separate from the shared pay-as-you-go
# free tier. Account eligibility and plan activation must be checked before cutover.
# Creating a distribution does not move traffic: DNS is changed separately after testing.

variable "cloudfront_enable_production" {
  type        = bool
  default     = false
  description = "Create production CloudFront after staging is verified. Keep enabled once production is deployed."
}

locals {
  cloudfront_environments = {
    for environment, settings in {
      staging = {
        domain    = "staging.climatewatchdata.org"
        origin    = module.staging_load_balancer.lb_dns
        plan_tier = "FREE"
      }
      production = {
        domain    = "www.climatewatchdata.org"
        origin    = module.prod_load_balancer.lb_dns
        plan_tier = "PRO"
      }
    } : environment => settings if environment == "staging" || var.cloudfront_enable_production
  }
}

# Find each environment's existing certificate. CloudFront requires us-east-1,
# which is also the region used by this stack and its load balancers.
data "aws_acm_certificate" "cloudfront" {
  for_each    = local.cloudfront_environments
  domain      = each.value.domain
  statuses    = ["ISSUED"]
  most_recent = true
}

# AWS-managed policies: cache nothing, and send the origin everything the visitor sent
# (including the Host header, cookies and query string) plus CloudFront's own headers, such
# as CloudFront-Viewer-Country, which the app uses to pick the map for the visitor's country.
data "aws_cloudfront_cache_policy" "caching_disabled" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_origin_request_policy" "all_viewer_and_cloudfront_headers" {
  name = "Managed-AllViewerAndCloudFrontHeaders-2022-06"
}

# The flat-rate plan requires a web ACL of its own on the distribution, and covers its cost.
# It has no rules and allows everything, so it doesn't change which requests get through.
resource "aws_wafv2_web_acl" "cloudfront" {
  for_each = local.cloudfront_environments

  name        = "${var.project_name}-${each.key}"
  description = "Required by the CloudFront flat-rate plan for ${each.value.domain}. Allows everything."
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.project_name}-${each.key}"
    sampled_requests_enabled   = true
  }

  tags = local.tags
}

resource "aws_cloudfront_distribution" "environment" {
  for_each = local.cloudfront_environments

  enabled         = true
  comment         = "${var.project_name} ${each.key} (${each.value.domain})"
  aliases         = [each.value.domain]
  is_ipv6_enabled = true
  http_version    = "http2"
  price_class     = "PriceClass_All"
  web_acl_id      = aws_wafv2_web_acl.cloudfront[each.key].arn

  origin {
    origin_id   = "${each.key}-load-balancer"
    domain_name = each.value.origin

    custom_origin_config {
      http_port  = 80
      https_port = 443
      # Over HTTP the load balancer answers with a redirect to HTTPS, which would loop.
      # CloudFront checks the load balancer's certificate against the Host header it
      # forwards, so the matching environment certificate on the load balancer is used.
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
      # Same as the load balancer's idle timeout, so slow responses fail no sooner than today.
      origin_read_timeout = 60
    }
  }

  default_cache_behavior {
    target_origin_id         = "${each.key}-load-balancer"
    viewer_protocol_policy   = "redirect-to-https"
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = data.aws_cloudfront_cache_policy.caching_disabled.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.all_viewer_and_cloudfront_headers.id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.cloudfront[each.key].arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = local.tags
}

# Separate flat-rate subscriptions: Free for staging, Pro for production.
# AWS provider 3.x has no resource for it, so it's a CloudFormation stack, like the snapshot
# policy in snapshots.tf.
#
# A paid plan is created waiting for approval and isn't billed, or applied, until someone
# approves it (CloudFront console > the distribution > Manage plan). Free activates
# without paid approval. Verify activation before moving either environment's DNS;
# a distribution without an active subscription uses pay-as-you-go pricing.
resource "aws_cloudformation_stack" "cloudfront_plan" {
  for_each = local.cloudfront_environments

  name = "${var.project_name}-${each.key}-cloudfront-plan"
  template_body = jsonencode({
    Resources = {
      Subscription = {
        Type = "AWS::PricingPlanManager::Subscription"
        Properties = {
          PlanFamily = "CloudFront"
          PlanTier   = each.value.plan_tier
          UsageLevel = "DEFAULT"
          ResourceArns = [
            aws_cloudfront_distribution.environment[each.key].arn,
            aws_wafv2_web_acl.cloudfront[each.key].arn,
          ]
        }
      }
    }
  })
  tags = local.tags
}
