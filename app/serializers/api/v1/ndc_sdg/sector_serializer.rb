module Api
  module V1
    module NdcSdg
      class SectorSerializer < ActiveModel::Serializer
        attribute :id
        attribute :name
      end
    end
  end
end
