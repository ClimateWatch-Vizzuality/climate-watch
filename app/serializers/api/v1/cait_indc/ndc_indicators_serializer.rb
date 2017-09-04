module Api
  module V1
    module CaitIndc
      class NdcIndicatorsSerializer < ActiveModel::Serializer
        attribute :categories

        has_many :indicators,
                 serializer: IndicatorSerializer

        def categories
          serialized_values = ActiveModelSerializers::SerializableResource.new(
            object.categories,
            each_serializer: CategorySerializer
          ).as_json

          object.categories.
            map(&:id).
            zip(serialized_values).
            sort.
            to_h
        end
      end
    end
  end
end
