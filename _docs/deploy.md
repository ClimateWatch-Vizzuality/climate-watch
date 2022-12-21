---
layout: default
title: Deploy
---

# Deploy

The app is deployed with [capistrano](https://capistranorb.com/). There are two scripts on package json to deploy to staging and production:

### `yarn deploy:staging`

### `yarn deploy:production`


Important: Staging will deploy from `develop` branch and production from `master`. Make sure everything is merged before running the commands. The Environment variables should be set afterwards on the server direcly.