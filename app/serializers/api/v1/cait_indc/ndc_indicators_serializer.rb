module Api
  module V1
    module CaitIndc
      class NdcIndicatorsSerializer < ActiveModel::Serializer
        attribute :categories

        has_many :indicators,
                 serializer: IndicatorSerializer

        def categories
          IndexedSerializer.serialize(
            object.categories,
            serializer: CategorySerializer,
            &:id
          )
        end

        def sectors
          IndexedSerializer.serialize(
            object.sectors,
            serializer: SectorSerializer,
            &:id
          )
        end
      end
    end
  end
end
