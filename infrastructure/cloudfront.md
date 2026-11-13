# CloudFront rollout

CloudFront starts with staging only. Both environments share the configuration in
`cloudfront.tf`, with separate distributions, certificates, WAF ACLs and plans.
Staging uses its own load balancer and the Free flat-rate plan; production uses its
own load balancer and Pro ($15/month). The Free plan is distinct from the shared
pay-as-you-go free tier. Confirm account eligibility and subscription activation.

## Staging first

1. Review and deploy the country-header app fix to staging.
2. Run `just tf-plan` from this worktree. Expect one staging distribution, one WAF
   ACL and one subscription stack (3 additions), with no production CloudFront.
   Review the entire plan for unrelated changes before applying it.
3. Apply the reviewed plan. Confirm that the Free subscription is active.
4. Test privately using the staging hostname routed locally to CloudFront, preserving
   the hostname for HTTPS. Test navigation, APIs, downloads, query parameters,
   cookies and country-specific maps. Confirm app responses are not cached.
5. Change only staging's DNS to `staging_cloudfront_domain`, then repeat the checks.
   Roll back by restoring its previous load balancer DNS target if needed.
6. Update the Climate Watch AWS Usage Confluence page with the verified deployment.

## Production after staging passes

1. Release the tested country-header app fix to production.
2. Add `cloudfront_enable_production = true` to `infrastructure/vars/terraform.tfvars`
   and keep that setting enabled thereafter. Turning it off after deployment would
   plan deletion of the production CloudFront resources.
3. Run `just tf-plan`; expect 3 production additions and no changes to staging.
4. Apply the reviewed plan and approve the Pro subscription in the CloudFront
   console. Confirm activation and pricing before moving production traffic.
5. Test privately using the production hostname, then change only `www` DNS to
   `prod_cloudfront_domain` and verify the site. Preserve the old DNS target for rollback.
6. Update Confluence with the verified production deployment.

Creating distributions does not change DNS. The bare domain and other production
redirect domains continue to use the load balancer. Caching and restricting direct
load balancer access are separate follow-up changes.
