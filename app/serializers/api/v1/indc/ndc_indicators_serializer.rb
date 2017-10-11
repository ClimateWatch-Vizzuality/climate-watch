module Api
  module V1
    module Indc
      class NdcIndicatorsSerializer < ActiveModel::Serializer
        attribute :categories

        attribute :sectors

        has_many :indicators,
                 serializer: IndicatorSerializer

        def categories
          IndexedSerializer.serialize(
            object.categories,
            each_serializer: CategorySerializer,
            &:id
          )
        end

        def sectors
          IndexedSerializer.serialize(
            object.sectors,
            each_serializer: SectorSerializer,
            &:id
          )
        end
      end
    end
  end
end
