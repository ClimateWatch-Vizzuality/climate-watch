module Api
  module V1
    class LocationSerializer < ActiveModel::Serializer
      attributes :iso_code3,
                 :pik_name,
                 :cait_name,
                 :ndcp_navigators_name,
                 :wri_standard_name,
                 :unfccc_group

      attribute :topojson, if: -> { instance_options[:topojson] }
    end
  end
end
