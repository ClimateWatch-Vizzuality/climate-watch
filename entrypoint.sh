#!/bin/bash
set -e

case "$1" in

    start)
        echo "Running Start"
        bundle exec rails tmp:clear db:migrate
        bundle exec rails db:admin_boilerplate:create
        exec bundle exec rails server -b 0.0.0.0
        ;;
    sidekiq)
        echo "Running sidekiq"
        exec bundle exec sidekiq
        ;;
    *)
        exec "$@"
esac
