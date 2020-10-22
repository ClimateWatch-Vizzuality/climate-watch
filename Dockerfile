FROM ruby:2.5.1
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

ARG FEATURE_NET_ZERO
ENV FEATURE_NET_ZERO $FEATURE_NET_ZERO

ARG USER_REPORT_KEY
ENV USER_REPORT_KEY $USER_REPORT_KEY

# Install dependencies
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client nodejs build-essential patch zlib1g-dev liblzma-dev libicu-dev
RUN npm install -g yarn

RUN gem install bundler --no-ri --no-rdoc

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME

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
