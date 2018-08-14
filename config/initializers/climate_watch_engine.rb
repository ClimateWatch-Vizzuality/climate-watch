ClimateWatchEngine.s3_bucket_name = Rails.application.secrets.s3_bucket_name

# Locations engine initializer
require 'locations'
Locations.locations_filepath = "#{CW_FILES_PREFIX}locations/locations.csv"
Locations.cartodb_url =
  'https://wri-01.carto.com/api/v2/sql?q=SELECT%20name_engli,iso,topojson,centroid%20FROM%20gadm28_countries'.freeze
Locations.location_groupings_filepath = "#{CW_FILES_PREFIX}locations/locations_groupings.csv"
