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
are hard to install, such as Apple Silicon Macs.

1. Create a `.env` file. Docker Compose sets `POSTGRES_URL` and `REDIS_SERVER`
   itself, so a copy of the sample is enough to start:

   ```
   cp .env.sample .env
   ```

2. On Apple Silicon (arm64), build and run the containers as x86_64, because the
   Dockerfile installs the x64 build of Node 12:

   ```
   export DOCKER_DEFAULT_PLATFORM=linux/amd64
   ```

   In Docker Desktop, turning on Settings > General > "Use Rosetta for
   x86_64/amd64 emulation on Apple Silicon" makes this faster. (Search for "Choose Virtual Machine Manager (VMM)" if you can't find it.)

3. Build and start the app, Sidekiq, Postgres and Redis:

   ```
   docker compose up --build
   ```

   On start, the app container runs the migrations and
   `db:admin_boilerplate:create`, then serves the app on `http://localhost:3000/`
   and the webpack dev server on port 3035.

The database starts empty. To load data, see [Import and rake tasks](/climate-watch/_docs/import-rake).
`rake db:import` reads the datasets from S3, so `.env` needs `AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME` and `CW_FILES_PREFIX`.
Run it inside the app container:

```
docker compose exec app bundle exec rake db:import
```

## Infrastructure

This project uses [Terraform](https://www.terraform.io/) as an [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code) solution to deploy to [AWS](https://aws.amazon.com/). All this code can be found in the `/infrastructure` folder.

It's worth noting that the infrastructure includes an [AWS EC2](https://aws.amazon.com/ec2/) server that is partially configured by Terraform, but that requires additional setup. You can find more details in the `/infrastructure/templates/server_setup.sh.tpl` file.
