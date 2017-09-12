module Api
  module V1
    class LocationNanoSerializer < ActiveModel::Serializer
      attribute :iso_code3
      attribute :wri_standard_name, key: :name

      attribute :topojson, if: -> { instance_options[:topojson] }
    end
  end
end
