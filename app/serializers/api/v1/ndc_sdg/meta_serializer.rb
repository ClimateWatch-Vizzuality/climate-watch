module Api
  module V1
    module NdcSdg
      class MetaSerializer < ActiveModel::Serializer
        has_many :sectors
        has_many :targets
      end
    end
  end
end
