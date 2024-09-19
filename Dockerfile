FROM ruby:2.6.10
MAINTAINER info@vizzuality.com

ENV NAME climate-watch
ENV ESP_API https://data.emissionspathways.org/api/v1
ENV CW_API https://www.climatewatchdata.org/api/v1
ENV GFW_API https://production-api.globalforestwatch.org
ENV S3_BUCKET_NAME wri-sites

ENV GOOGLE_ANALYTICS_ID UA-1981881-51
ENV GOOGLE_TAG_MANAGER_ID GTM-WJ7FGCZ

# args from command execution
ARG secretKey
ENV SECRET_KEY_BASE $secretKey

# Install dependencies
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  postgresql-client nodejs build-essential patch zlib1g-dev liblzma-dev libicu-dev
RUN npm install -g yarn

# Create app directory
RUN mkdir -p /usr/src/$NAME
WORKDIR /usr/src/$NAME
COPY . ./

# Install gems
RUN gem install bundler:2.3.11
RUN cd /usr/src/$NAME && bundle install --jobs 4

# Yarn install
RUN yarn install

# Expose port 3000 to the Docker host, so we can access it
EXPOSE 3000

# Download maxmind IP db
RUN bundle exec rails db:import_maxmind

# Rails assets compile
RUN bundle exec rake assets:precompile

# Start app
ENTRYPOINT ["./entrypoint.sh"]
CMD ["start"]