module Api
  module V1
    module Adaptation
      class ValueSerializer < ActiveModel::Serializer
        attribute :value
        attribute :location
        #belongs_to :location, serializer: Api::V1::LocationSerializer

        def value
          object.number_value ||
            object.boolean_value ||
              object.number_value
        end

        def location
          object.location.iso_code3
        end
      end
    end
  end
end
