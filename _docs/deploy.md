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