#
# Lets the GitHub Actions deploy workflow (.github/workflows/deploy-staging.yml) reach
# the staging server without long-lived AWS keys: the workflow swaps a GitHub OIDC token
# for this role, which can only push a short-lived SSH key to the staging server through
# EC2 Instance Connect.
#
locals {
  github_repository = "ClimateWatch-Vizzuality/climate-watch"
}

resource "aws_iam_openid_connect_provider" "github" {
  url            = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  # AWS no longer checks these for GitHub's provider, but AWS provider 3.x requires the
  # argument. These are GitHub's published thumbprints.
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd",
  ]
  tags = local.tags
}

data "aws_iam_policy_document" "github_deploy_staging_assume_role" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # Only jobs in this repo that run in the staging GitHub Environment
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${local.github_repository}:environment:staging"]
    }
  }
}

resource "aws_iam_role" "github_deploy_staging" {
  name               = "${var.project_name}-github-deploy-staging"
  assume_role_policy = data.aws_iam_policy_document.github_deploy_staging_assume_role.json
  tags               = local.tags
}

data "aws_iam_policy_document" "github_deploy_staging" {
  statement {
    actions   = ["ec2-instance-connect:SendSSHPublicKey"]
    resources = ["arn:aws:ec2:${var.aws_region}:${data.aws_caller_identity.current.account_id}:instance/${module.staging_server.ec2_instance_id}"]

    condition {
      test     = "StringEquals"
      variable = "ec2:osuser"
      values   = ["ubuntu"]
    }
  }
}

resource "aws_iam_role_policy" "github_deploy_staging" {
  name   = "instance-connect-staging"
  role   = aws_iam_role.github_deploy_staging.id
  policy = data.aws_iam_policy_document.github_deploy_staging.json
}
