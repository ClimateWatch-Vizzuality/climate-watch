# Climate Watch

[Docs page](https://climatewatch-vizzuality.github.io/climate-watch/){:target="_blank" .btn .btn-outline }

[Changelog](https://climatewatch-vizzuality.github.io/climate-watch//_docs/changelog){:target="_blank" .btn .btn-outline }

Table of Contents:

- [Local Setup](#local-setup)
- [Deploy](#deploy)

## Local setup

### System dependencies

- postgres 9.6

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
project's settings. At the very least you'll need to have the `POSTGRES_URL` and `SHARED_POSTGRES_URL`
env variable.

```
POSTGRES_URL=postgresql://postgres@localhost/climate-watch_development
SHARED_POSTGRES_URL=postgresql://postgres@localhost/climate-watch-shared_development
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
```docker-compose up```
Ta-da!

## Infrastructure

This project uses [Terraform](https://www.terraform.io/) as an [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code) solution to deploy to [AWS](https://aws.amazon.com/). All this code can be found in the `/infrastructure` folder.

It's worth noting that the infrastructure includes an [AWS EC2](https://aws.amazon.com/ec2/) server that is partially configured by Terraform, but that requires additional setup. You can find more details in the `/infrastructure/templates/server_setup.sh.tpl` file.

## Deploy

The app is deployed with [capistrano](https://capistranorb.com/). There are two scripts on package json to deploy to staging and production. Staging will deploy from develop branch and production from master. The Environment variables will be set afterwards on the server direcly.

### Release
To release using a [fork of zeit release](https://github.com/vizzuality/release) to generate the changelog automatically with all of the PR included since the last release just run:

(Be sure you have all of your branches sync first,
and merge the changes that you want in master locally before running the command)

```bash
npx release 'major' | 'minor' | 'patch'
```

and push to master!