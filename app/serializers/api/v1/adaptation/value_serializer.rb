module Api
  module V1
    module Adaptation
      class ValueSerializer < ActiveModel::Serializer
        attribute :location
        attribute :value

        def location
          object.location.iso_code3
        end
      end
    end
  end
end
