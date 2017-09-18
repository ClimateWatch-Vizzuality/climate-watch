module Api
  module V1
    module Adaptation
      class ValueSerializer < ActiveModel::Serializer
        attribute :location
        attribute :value
        attribute :rank

        def location
          object.location.iso_code3
        end

        def rank
          {
            absolute: object.absolute_rank,
            relative: object.relative_rank
          }
        end
      end
    end
  end
end
