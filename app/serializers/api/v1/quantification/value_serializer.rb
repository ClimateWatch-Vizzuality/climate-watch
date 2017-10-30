module Api
  module V1
    module Quantification
      class ValueSerializer < ActiveModel::Serializer
        attribute :location
        attribute :value
        attribute :label
        attribute :range

        def location
          object.location.iso_code3
        end

        def label
          object.label.name
        end
      end
    end
  end
end
