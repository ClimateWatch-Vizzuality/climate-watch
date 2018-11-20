module Api
  module V1
    class LocationSerializer < ActiveModel::Serializer
      attributes :iso_code3,
                 :pik_name,
                 :cait_name,
                 :ndcp_navigators_name,
                 :wri_standard_name,
                 :unfccc_group,
                 :centroid,
                 :is_in_eu

      has_many :members,
               serializer: Api::V1::LocationSerializer,
               if: -> { object.location_type != 'COUNTRY' }

      attribute :topojson, if: -> { instance_options[:topojson] }
    end
  end
end
