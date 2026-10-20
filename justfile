# Build and run containers as x86_64 (the Dockerfile installs x64 Node 12)
export DOCKER_DEFAULT_PLATFORM := "linux/amd64"

# List recipes
default:
    @just --list

# Create .env from the sample if it doesn't exist
setup:
    test -f .env || cp .env.sample .env

# Build the images
build:
    docker compose build

# Start the app, Sidekiq, Postgres and Redis
up:
    docker compose up --build

# Stop everything
down:
    docker compose down

# Remove this project's containers, database volume and images (keeps .env)
clean:
    docker compose down --volumes --rmi all --remove-orphans

# Set everything up from scratch: .env, images, schema, data, running app
bootstrap profile: setup
    docker compose build
    docker compose up -d postgres redis
    until docker compose exec -T postgres pg_isready -U postgres >/dev/null 2>&1; do sleep 1; done
    just db-reset
    just import {{profile}}
    docker compose up -d app sidekiq

# Follow the app logs
logs:
    docker compose logs -f app

# Recreate the development database and load the schema (wipes imported data)
db-reset:
    docker compose run --rm app bash -c 'psql "${POSTGRES_URL%/*}/postgres" -c "DROP DATABASE IF EXISTS climate_watch WITH (FORCE)" -c "CREATE DATABASE climate_watch" && psql "$POSTGRES_URL" -v ON_ERROR_STOP=1 -q -f db/structure.sql'

# Import data from S3 using AWS SSO credentials (run `aws sso login` first)
import profile:
    eval "$(aws configure export-credentials --profile {{profile}} --format env)" && \
    docker compose run --rm -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN \
      app bundle exec rake db:import

# Import data from S3 using IAM user keys in .env
import-iam:
    docker compose run --rm app bundle exec rake db:import

# Row counts for a few imported tables
db-counts:
    docker compose exec postgres psql -U postgres -d climate_watch -c "SELECT 'locations', count(*) FROM locations UNION ALL SELECT 'historical_emissions_records', count(*) FROM historical_emissions_records"

# Frontend tests
test-js:
    docker compose run --rm app yarn test

# Backend tests (DEV_USER_* must match fixtures/vcr_cassettes/user_token.yml)
test-rb:
    docker compose run --rm \
      -e RAILS_ENV=test -e PGHOST=postgres -e PGUSER=postgres -e PGPASSWORD=example \
      -e GFW_API=https://staging-api.globalforestwatch.org \
      -e DEV_USER_ID=DEV_USER_ID_PLACEHOLDER -e DEV_USER_TOKEN=DEV_USER_TOKEN_PLACEHOLDER \
      app bash -c "bin/rails db:drop db:create db:structure:load && bundle exec rspec"

# All tests
test: test-js test-rb
