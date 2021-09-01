FROM ruby:2.5.9
MAINTAINER info@vizzuality.com

ENV NAME climate-watch

# Set application environment

# args from command execution
ARG RAILS_ENV
ENV RAILS_ENV $RAILS_ENV

ARG CW_FILES_PREFIX
ENV CW_FILES_PREFIX $CW_FILES_PREFIX

ENV RACK_ENV $RAILS_ENV
ENV NODE_ENV $RAILS_ENV

ENV ESP_API https://data.emissionspathways.org/api/v1
ENV CW_API /api/v1
ENV GFW_API https://production-api.globalforestwatch.org
ENV S3_BUCKET_NAME wri-sites

ENV GOOGLE_ANALYTICS_ID UA-1981881-51

ARG FEATURE_POP_UP
ENV FEATURE_POP_UP $FEATURE_POP_UP

ARG FEATURE_ENHANCEMENT_CHANGES
ENV FEATURE_ENHANCEMENT_CHANGES $FEATURE_ENHANCEMENT_CHANGES

ARG FEATURE_SHOW_LTS_SUMMARY
ENV FEATURE_SHOW_LTS_SUMMARY $FEATURE_SHOW_LTS_SUMMARY

ARG FEATURE_WEB_TOUR
ENV FEATURE_WEB_TOUR $FEATURE_WEB_TOUR

ARG FEATURE_DYNAMIC_ZIP
ENV FEATURE_DYNAMIC_ZIP $FEATURE_DYNAMIC_ZIP

ARG POP_UP
ENV POP_UP $POP_UP

ARG FEATURE_KEY_VISUALIZATIONS
ENV FEATURE_KEY_VISUALIZATIONS $FEATURE_KEY_VISUALIZATIONS

ARG USER_REPORT_KEY
ENV USER_REPORT_KEY $USER_REPORT_KEY

# Install dependencies
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  postgresql-client nodejs build-essential patch zlib1g-dev liblzma-dev libicu-dev
RUN npm install -g yarn

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME

# Install app dependencies
COPY Gemfile Gemfile.lock ./

RUN cd /usr/src/$NAME && bundle install --without development test --jobs 4 --deployment

# Yarn install
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

# Env variables
ARG secretKey
ENV SECRET_KEY_BASE $secretKey

ARG APPSIGNAL_PUSH_API_KEY
ENV APPSIGNAL_PUSH_API_KEY $APPSIGNAL_PUSH_API_KEY

ARG USER_SURVEY_SPREADSHEET_URL
ENV USER_SURVEY_SPREADSHEET_URL $USER_SURVEY_SPREADSHEET_URL

ARG USER_NEWSLETTER_URL
ENV USER_NEWSLETTER_URL $USER_NEWSLETTER_URL

ARG MAXMIND_LICENSE_KEY
ENV MAXMIND_LICENSE_KEY $MAXMIND_LICENSE_KEY

# Bundle app source
COPY . ./

EXPOSE 3000

# Download maxmind IP db
RUN bundle exec rails db:import_maxmind

# Rails assets compile
RUN bundle exec rake assets:precompile

# Start app
ENTRYPOINT ["./entrypoint.sh"]
