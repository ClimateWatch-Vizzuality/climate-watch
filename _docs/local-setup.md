---
layout: default
title: Local setup
permalink: /_docs/local-setup
---

# Local setup

### System dependencies

- postgres 11

### Installing application dependencies

```
yarn run js:install
```

and then

```
yarn run rails:install
```

These will satisfy both the frontend and backend's dependency requirements.

#### Setting up the Rails environment

Copy the sample `.env.sample` file to `.env` and modify it as needed to fit the
project's settings. At the very least you'll need to have the `POSTGRES_URL` env variable.

```
POSTGRES_URL=postgresql://postgres@localhost/climate-watch_development
```

#### Setting up the database

```
yarn run rails:db:create
```

and then

```
yarn run rails:db:migrate
```

These will create the development database and then run the database migration tasks.

#### Geolocation

The App is using MAXMIND DB to geolocate users. In test and development environment we are using the MaxMind Test DB by default. In order to use real DB you need to download it
locally setting `MAXMIND_LICENSE_KEY` and using rake task `db:import_maxmind`. Then to use real DB in dev environment you need to run project with env variable
`MAXMIND_REAL_DB=true`.

It is possible to override returned user country code in development mode using env variable `CW_USER_COUNTRY_OVERRIDE`.

### Launching The App

You'll need to run both the rails server and the webpack server, which will be used internally by rails. Run, separately:

```
yarn run rails:server
```

and

```
yarn run js:server
```

Point your browser to `http://localhost:3000/`. Ta-da!

### Launching the app with docker

Docker is the easiest way to run the app on machines where Ruby 2.6 and Node 12
are hard to install, such as Apple Silicon Macs. The commands live in the
`justfile` (install [just](https://github.com/casey/just), then run `just` to
list them).

1. `just setup` creates `.env` from the sample. Docker Compose sets
   `POSTGRES_URL` and `REDIS_SERVER` itself, so the sample is enough to start.

2. `just up` builds and starts the app, Sidekiq, Postgres and Redis. The app is
   served on `http://localhost:3000/` and the webpack dev server on port 3035.
   `docker-compose.yml` sets `WEBPACKER_DEV_SERVER_HOST=0.0.0.0`, because
   `config/webpacker.yml` binds the dev server to `localhost`, which the browser
   can't reach inside the container (live reload fails with
   `WebSocket connection to 'ws://localhost:3035/ws' failed`). It also sets
   `RAILS_MAX_THREADS=1`: with several Puma threads, the parallel API requests
   on the first page load race to autoload code and fail with errors like
   `uninitialized constant Api::V1::...` or
   `Bootsnap::LoadPathCache::Store::NestedTransactionError`. After changing
   environment variables in `docker-compose.yml`, recreate the container with
   `docker compose up -d app`; `docker compose restart` keeps the old values.

   The justfile builds and runs the containers as x86_64, because the Dockerfile
   installs the x64 build of Node 12. On Apple Silicon, turning on Docker
   Desktop's Settings > General > "Use Rosetta for x86_64/amd64 emulation on
   Apple Silicon" makes this faster. (Search for "Choose Virtual Machine Manager
   (VMM)" if you can't find it.)

   The build skips the MaxMind download unless a key is passed as a build
   argument. Development uses the bundled test DB (see [Geolocation](#geolocation)),
   so the key is only needed for the real DB:
   `docker compose build --build-arg MAXMIND_LICENSE_KEY=<key>`. The key is
   visible in the image history, so only do this for local images.

3. `just db-reset` recreates the development database and loads the schema from
   `db/structure.sql`. Rerunning it wipes any imported data.

4. Load the data (see [Import and rake tasks](/climate-watch/_docs/import-rake)).
   `rake db:import` reads the datasets from S3, so `.env` needs `AWS_REGION`,
   `S3_BUCKET_NAME` and `CW_FILES_PREFIX`, plus AWS credentials:

   - With AWS SSO, run `aws sso login --profile <profile>`, then
     `just import <profile>`. The temporary credentials include
     `AWS_SESSION_TOKEN` and expire, so log in again if a long import fails.
   - With IAM user keys, set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in
     `.env` and run `just import-iam`.

   `just db-counts` shows how many rows were imported into a few tables.

`just bootstrap <profile>` runs all of the above with SSO credentials and starts
the app in the background. `just clean` removes this project's containers,
database volume and images, but keeps `.env`, so `just clean` followed by
`just bootstrap <profile>` rebuilds everything from scratch.

#### Running the tests with docker

`just test-js` runs the frontend tests (Jest) and `just test-rb` the backend
tests (RSpec); `just test` runs both. The test database settings use `PGHOST`,
`PGUSER` and `PGPASSWORD`, not `POSTGRES_URL`, and the `DEV_USER_*` values in
the recipe must match the recorded responses in
`fixtures/vcr_cassettes/user_token.yml`.

`spec/services/import_locations_spec.rb` calls the Carto API, so the backend
tests need network access.

## Infrastructure

This project uses [Terraform](https://www.terraform.io/) as an [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code) solution to deploy to [AWS](https://aws.amazon.com/). All this code can be found in the `/infrastructure` folder.

It's worth noting that the infrastructure includes an [AWS EC2](https://aws.amazon.com/ec2/) server that is partially configured by Terraform, but that requires additional setup. You can find more details in the `/infrastructure/templates/server_setup.sh.tpl` file.
