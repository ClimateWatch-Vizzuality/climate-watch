---
layout: default
title: Deploy
permalink: /_docs/deploy
---

# Deploy

The app is deployed with [capistrano](https://capistranorb.com/). There are two scripts on package json to deploy to staging and production:

### `yarn deploy:staging`

### `yarn deploy:production`


Important: Staging will deploy from `develop` branch and production from `master`. Make sure everything is merged before running the commands. The Environment variables should be set afterwards on the server direcly.

The server addresses aren't in the repo: set `CW_STAGING_HOST` and
`CW_PRODUCTION_HOST` in your local `.env` (Capistrano loads it). Ask the team
for the values.

### `just deploy-staging [branch]`

With the Docker setup (see [Local setup](/climate-watch/_docs/local-setup)), this runs
Capistrano inside the app container, so Ruby and the gems don't need to be
installed locally. It deploys `develop` by default, or the given branch through
`DEPLOY_BRANCH`. Access uses EC2 Instance Connect: the recipe creates a
throwaway SSH key, pushes its public half to the server before and during the
deploy (each push is accepted for 60 seconds), and deletes the key afterwards.
Your AWS SSO role is what grants access. Before running it:

- `aws sso login --profile <profile>` (the recipe's second argument; see the justfile for the default)
- connect to the server once with `ssh` so its host key is in `~/.ssh/known_hosts`
- set `CW_STAGING_INSTANCE_ID` in `.env`

### GitHub Actions (staging)

The [Deploy staging workflow](https://github.com/ClimateWatch-Vizzuality/climate-watch/actions/workflows/deploy-staging.yml)
runs the same Capistrano deploy:

- on every push to `develop` that changes the site, once Tests and Frontend
  Tests pass
- by hand from the Actions tab (**Run workflow**), for any branch, without
  running the tests again

A push that only changes files the site doesn't use (`infrastructure/`, the
docs, `spec/`, other workflows, Docker and `just` files; see the `paths` list in
the workflow) doesn't deploy. After one, `just rev-staging` shows an older commit
than `develop`, but staging is serving the same site.

A push to `develop` replaces whatever is on staging, including a feature branch
deployed for review. Only one deploy runs at a time. A running deploy is never
cancelled, and of the runs waiting, only the newest goes ahead.

Access works like `just deploy-staging`, without AWS keys stored in GitHub: the
job swaps its GitHub OIDC token for the `climatewatch-github-deploy-staging` IAM
role (`infrastructure/github_actions.tf`). That role can only push an SSH key
to the staging server, as `ubuntu`, through EC2 Instance Connect, and only jobs
that run in this repo's `staging` environment can use it.

The `staging` environment (Settings → Environments) holds:

| Name | Kind | Value |
| --- | --- | --- |
| `AWS_DEPLOY_ROLE_ARN` | variable | Terraform output `github_deploy_staging_role_arn` |
| `CW_STAGING_HOST_KEYS` | variable | The server's SSH host keys, one `type key` per line (from `/etc/ssh/ssh_host_*_key.pub` on the server) |
| `CW_STAGING_HOST` | secret | Same as in `.env` |
| `CW_STAGING_INSTANCE_ID` | secret | Same as in `.env` |

The host and instance ID are secrets so they're masked in the public logs. The
environment only allows deploys from workflows running on `develop`. After the
deploy, the job checks that staging answers (a 401 from the app's basic auth
counts as up).

### `just rollback-staging`

Runs `cap staging deploy:rollback` the same way, switching staging back to the
previous release in `/var/www/climatewatch/releases`, then restarts Sidekiq: the
rollback quiets Sidekiq but never stops it, so without the restart it stays
paused (`ps` shows `stopping`). It doesn't undo database migrations, and it
archives and deletes the release it rolled back from, so going forward again
means a new deploy.

### `just deploy-production` and `just rollback-production`

The same as the staging recipes, for production, using `CW_PRODUCTION_INSTANCE_ID`
in `.env`. Both ask you to type `production` first, and `deploy-production`
always deploys `master`. `just snapshot-production` snapshots the instance's EBS
volumes (code, gems, assets, config) if you want one before a risky change. The
database is on RDS and isn't covered by that snapshot; RDS keeps its own
automated backups.