module Api
  module V1
    module Adaptation
      class ValueSerializer < ActiveModel::Serializer
        attribute :location
        attribute :value
        attribute :rank, if: -> { object.absolute_rank }

        def location
          object.location.iso_code3
        end

        def rank
          {
            absolute: object.absolute_rank,
            relative: object.relative_rank,
            maximum: ::Adaptation::Value.where(variable_id: object.variable_id).
              maximum(:absolute_rank)
          }
        end
      end
    end
  end
end
