FROM ruby:2.5.1
MAINTAINER Jose Angel Parreño <joseangel.parreno@vizzuality.com>

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

ARG FEATURE_AGRICULTURE
ENV FEATURE_AGRICULTURE $FEATURE_AGRICULTURE

ARG FEATURE_NDC_EXPLORE
ENV FEATURE_NDC_EXPLORE $FEATURE_NDC_EXPLORE

ARG FEATURE_NEW_GHG
ENV FEATURE_NEW_GHG $FEATURE_NEW_GHG

ARG FEATURE_NDC_FILTERING
ENV FEATURE_NDC_FILTERING $FEATURE_NDC_FILTERING

ARG FEATURE_COMMITMENTS_OVERVIEW
ENV FEATURE_COMMITMENTS_OVERVIEW $FEATURE_COMMITMENTS_OVERVIEW

ARG FEATURE_ALL_COMMITMENTS_MENU_ITEMS
ENV FEATURE_ALL_COMMITMENTS_MENU_ITEMS $FEATURE_ALL_COMMITMENTS_MENU_ITEMS

ARG USER_REPORT_KEY
ENV USER_REPORT_KEY $USER_REPORT_KEY

# Install dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/* \
    && curl -sL https://deb.nodesource.com/setup_12x | bash - \
    && apt-get install -y nodejs build-essential patch zlib1g-dev liblzma-dev libicu-dev \
    && npm install -g yarn

RUN gem install bundler --no-ri --no-rdoc

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME
# VOLUME /usr/src/$NAME

# Install and run scheduling
#RUN gem install whenever
#RUN whenever --load-file config/schedule.rb
#RUN whenever --update-crontab

# Install app dependencies
COPY Gemfile Gemfile.lock ./

RUN cd /usr/src/$NAME && bundle install --without development test --jobs 4 --deployment

# Env variables
ARG secretKey
ENV SECRET_KEY_BASE $secretKey

ARG APPSIGNAL_PUSH_API_KEY
ENV APPSIGNAL_PUSH_API_KEY $APPSIGNAL_PUSH_API_KEY

ARG USER_SURVEY_SPREADSHEET_URL
ENV USER_SURVEY_SPREADSHEET_URL $USER_SURVEY_SPREADSHEET_URL

# Bundle app source
COPY . ./

EXPOSE 3000

# Rails assets compile
RUN bundle exec rake assets:precompile

# Start app
ENTRYPOINT ["./entrypoint.sh"]
