module Api
  module V1
    module Indc
      class NdcIndicatorsSerializer < ActiveModel::Serializer
        attribute :categories

        has_many :indicators,
                 serializer: IndicatorSerializer

        def categories
          IndexedSerializer.serialize(
            object.categories,
            each_serializer: CategorySerializer,
            &:id
          )
        end
      end
    end
  end
end
