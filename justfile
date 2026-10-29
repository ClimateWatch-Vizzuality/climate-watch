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

# Needs `aws sso login --profile <profile>` and CW_STAGING_INSTANCE_ID in .env.
# Deploy a branch to staging with Capistrano from the app container
deploy-staging branch="develop" profile="climate-watch-admin":
    @just _cap staging {{quote(profile)}} deploy {{quote(branch)}}

# Needs `aws sso login --profile <profile>` and CW_STAGING_INSTANCE_ID in .env.
# The rollback quiets Sidekiq but never stops it, so its `sidekiq:start` is a
# no-op and Sidekiq stays paused; restart it afterwards.
# Roll staging back to the previous release with Capistrano
rollback-staging profile="climate-watch-admin":
    @just _cap staging {{quote(profile)}} 'deploy:rollback sidekiq:restart'

# Needs `aws sso login --profile <profile>` and CW_PRODUCTION_INSTANCE_ID in .env.
# A snapshot is point-in-time when it starts, so the deploy can go ahead
# while it completes in the background.
# Snapshot all EBS volumes of the production instance
snapshot-production profile="climate-watch-admin":
    #!/usr/bin/env bash
    set -euo pipefail
    instance=$(grep -E '^CW_PRODUCTION_INSTANCE_ID=' .env | cut -d= -f2- || true)
    [ -n "$instance" ] || { echo "Set CW_PRODUCTION_INSTANCE_ID in .env" >&2; exit 1; }
    aws ec2 create-snapshots --profile {{profile}} --region us-east-1 \
      --instance-specification "InstanceId=$instance,ExcludeBootVolume=false" \
      --description "climate-watch production, manual snapshot, $(date -u +%Y-%m-%dT%H:%MZ), by $USER" \
      --tag-specifications "ResourceType=snapshot,Tags=[{Key=Name,Value=climate-watch-production-manual},{Key=CreatedBy,Value=$USER}]" \
      --query 'Snapshots[].[SnapshotId,VolumeId,VolumeSize,State]' --output table

# Needs `aws sso login --profile <profile>` and CW_PRODUCTION_INSTANCE_ID in .env.
# Show the latest snapshots of the production instance's volumes
snapshot-production-status count="5" profile="climate-watch-admin":
    #!/usr/bin/env bash
    set -euo pipefail
    instance=$(grep -E '^CW_PRODUCTION_INSTANCE_ID=' .env | cut -d= -f2- || true)
    [ -n "$instance" ] || { echo "Set CW_PRODUCTION_INSTANCE_ID in .env" >&2; exit 1; }
    volumes=$(aws ec2 describe-instances --profile {{profile}} --region us-east-1 --instance-ids "$instance" \
      --query 'Reservations[].Instances[].BlockDeviceMappings[].Ebs.VolumeId' --output text | tr '\t' ',')
    aws ec2 describe-snapshots --profile {{profile}} --region us-east-1 --owner-ids self \
      --filters "Name=volume-id,Values=$volumes" \
      --query "reverse(sort_by(Snapshots,&StartTime))[:{{count}}].[SnapshotId,StartTime,State,Progress,VolumeSize,Description]" \
      --output table

# Needs `aws sso login --profile <profile>` and CW_PRODUCTION_INSTANCE_ID in .env.
# Asks for confirmation, then deploys master.
# Deploy master to production with Capistrano from the app container
deploy-production profile="climate-watch-admin":
    #!/usr/bin/env bash
    set -euo pipefail
    echo "This deploys origin/master ($(git ls-remote origin refs/heads/master | cut -c1-9)) to PRODUCTION."
    read -r -p "Type 'production' to continue: " answer
    [ "$answer" = production ] || { echo "Aborted." >&2; exit 1; }
    just _cap production {{quote(profile)}} deploy

# Needs `aws sso login --profile <profile>` and CW_PRODUCTION_INSTANCE_ID in .env.
# Asks for confirmation; restarts Sidekiq afterwards (see rollback-staging).
# Roll production back to the previous release with Capistrano
rollback-production profile="climate-watch-admin":
    #!/usr/bin/env bash
    set -euo pipefail
    read -r -p "Type 'production' to roll PRODUCTION back to the previous release: " answer
    [ "$answer" = production ] || { echo "Aborted." >&2; exit 1; }
    just _cap production {{quote(profile)}} 'deploy:rollback sidekiq:restart'

# Run a Capistrano task against a stage (staging or production) from the app container
_cap stage profile task branch="develop":
    #!/usr/bin/env bash
    set -euo pipefail
    var="CW_$(echo {{stage}} | tr '[:lower:]' '[:upper:]')_INSTANCE_ID"
    instance=$(grep -E "^$var=" .env | cut -d= -f2- || true)
    [ -n "$instance" ] || { echo "Set $var in .env" >&2; exit 1; }
    # Throwaway key for this run only. RSA in PEM format so net-ssh can read
    # it without the ed25519/bcrypt_pbkdf gems.
    keydir=$(mktemp -d)
    refresher=""
    cleanup() {
        if [ -n "$refresher" ]; then
            kill "$refresher" 2>/dev/null || true
            wait "$refresher" 2>/dev/null || true
        fi
        rm -rf "$keydir"
    }
    trap cleanup EXIT
    ssh-keygen -q -t rsa -b 4096 -m PEM -N '' -C climate-watch-deploy -f "$keydir/id_rsa"
    # EC2 Instance Connect only accepts a pushed key for 60 seconds, and
    # Capistrano reconnects during a run, so keep pushing it until we're done.
    push_key() {
        aws ec2-instance-connect send-ssh-public-key --profile {{profile}} --region us-east-1 \
          --instance-id "$instance" --instance-os-user ubuntu \
          --ssh-public-key "file://$keydir/id_rsa.pub" >/dev/null
    }
    push_key
    ( while sleep 45; do push_key || true; done ) &
    refresher=$!
    docker compose run --rm --no-deps \
      -v "$keydir/id_rsa:/root/.ssh/id_rsa:ro" \
      -v "$HOME/.ssh/known_hosts:/root/.ssh/known_hosts:ro" \
      -e DEPLOY_BRANCH={{quote(branch)}} \
      -e USER="$USER" \
      app bundle exec cap {{stage}} {{task}}

# Needs `aws sso login --profile <profile>` and Docker Desktop running. Runs Terraform
# 1.0.5 (the version infrastructure/ requires) as x86_64, because the hashicorp/template
# provider has no Apple Silicon build. The state is locked in DynamoDB (aws-locks) while
# Terraform runs. Saves the plan to infrastructure/tfplan for tf-apply; the file can
# contain secrets, so it's gitignored.
# Show what Terraform would change in AWS (read-only)
tf-plan profile="climate-watch-admin":
    #!/usr/bin/env bash
    set -euo pipefail
    eval "$(aws configure export-credentials --profile {{profile}} --format env)"
    tf() {
        docker run --rm --platform linux/amd64 -v "$PWD/infrastructure:/w" -w /w \
          -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN \
          -e AWS_REGION=us-east-1 -e TF_IN_AUTOMATION=1 \
          hashicorp/terraform:1.0.5 "$@"
    }
    # Always init: it's quick, and picks up modules and backend settings changed since the
    # last run. -reconfigure because the state stays where it is.
    tf init -input=false -reconfigure -backend-config=bucket=climatewatch-tf-state > /dev/null
    tf plan -input=false -var-file=vars/terraform.tfvars -out=tfplan

# Needs a plan saved by `just tf-plan`. Terraform refuses the saved plan if the state has
# changed since, so it only makes the changes that plan showed.
# Apply the plan saved by tf-plan (changes AWS)
tf-apply profile="climate-watch-admin":
    #!/usr/bin/env bash
    set -euo pipefail
    [ -f infrastructure/tfplan ] || { echo "No saved plan; run just tf-plan first" >&2; exit 1; }
    eval "$(aws configure export-credentials --profile {{profile}} --format env)"
    tf() {
        docker run --rm --platform linux/amd64 -v "$PWD/infrastructure:/w" -w /w \
          -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -e AWS_SESSION_TOKEN \
          -e AWS_REGION=us-east-1 -e TF_IN_AUTOMATION=1 \
          hashicorp/terraform:1.0.5 "$@"
    }
    tf show tfplan
    read -r -p "Type 'apply' to make these changes in AWS: " answer
    [ "$answer" = apply ] || { echo "Aborted." >&2; exit 1; }
    tf apply -input=false tfplan
    rm -f infrastructure/tfplan

# All tests
test: test-js test-rb
