module Api
  module V1
    module CaitIndc
      class IndicatorSerializer < ActiveModel::Serializer
        attributes :name,
                   :slug,
                   :locations

        attribute :category,
                  if: -> { object.category }

        has_many :indicator_labels,
                 key: :labels

        def category
          object.category&.name
        end

        def locations
          serialized_values = ActiveModelSerializers::SerializableResource.new(
            object.values,
            each_serializer: ValueSerializer
          ).as_json

          object.values.
            map { |v| v.location.iso_code3 }.
            zip(serialized_values).
            sort.
            to_h
        end
      end
    end
  end
end
