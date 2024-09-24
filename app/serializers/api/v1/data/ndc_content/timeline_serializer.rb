module Api
  module V1
    module Data
      module NdcContent
        class TimelineSerializer < ActiveModel::Serializer
          belongs_to :location

          attributes :location_id,
            :submission,
            :date,
            :url
        end
      end
    end
  end
end
