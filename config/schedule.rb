# Use this file to easily define all of your cron jobs.
# Learn more: http://github.com/javan/whenever
# http://en.wikipedia.org/wiki/Cron

every 1.day do
  rake "stories:import"
end
