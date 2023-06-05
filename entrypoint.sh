#!/bin/bash
set -e

case "$1" in

    start)
        echo "Running Start"
        bundle exec rails tmp:clear db:migrate
        bundle exec rails db:admin_boilerplate:create
        if [[ "${RAILS_ENV}" = "production" ]]; then
          rails server --port 3000 --binding 0.0.0.0 -e ${RAILS_ENV}
        else
          rm -rf tmp/pids/server.pid
          bin/webpack-dev-server --port 3035 --host 0.0.0.0 &
          rails server --port 3000 --binding 0.0.0.0
        fi
        ;;
    sidekiq)
        echo "Running sidekiq"
        exec bundle exec sidekiq
        ;;
    *)
        exec "$@"
esac
