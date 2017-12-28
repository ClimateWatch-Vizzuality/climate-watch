FROM ruby:2.4.1
MAINTAINER Jose Angel Parreño <joseangel.parreno@vizzuality.com>

ENV NAME climate-watch
ENV RAKE_ENV production
ENV RAILS_ENV production
ENV CW_API /api/v1
ENV ESP_API https://data.emissionspathways.org/api/v1
ENV GOOGLE_ANALYTICS_ID UA-1981881-51

# Install dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/* \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs build-essential patch zlib1g-dev liblzma-dev libicu-dev \
    && npm install -g yarn

RUN gem install bundler --no-ri --no-rdoc

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME
# VOLUME /usr/src/$NAME

# Install app dependencies
COPY Gemfile Gemfile.lock ./

RUN bundle install --without development test --jobs 4 --deployment

# Bundle app source
ARG secretKey
ENV SECRET_KEY_BASE $secretKey
COPY . ./

EXPOSE 3000

# Rails assets compile
RUN bundle exec rake assets:precompile

# Start app
CMD bundle exec rake tmp:clear db:migrate && bundle exec rails s -b 0.0.0.0
