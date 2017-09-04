module Api
  module V1
    module CaitIndc
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :id
        attribute :name
        attribute :slug
        attribute :category_id, if: -> { object.category_id }
        attribute :labels
        attribute :locations

        def labels
          serialized_values = ActiveModelSerializers::SerializableResource.new(
            object.labels,
            each_serializer: LabelSerializer
          ).as_json

          object.labels.
            map(&:id).
            zip(serialized_values).
            sort.
            to_h
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
