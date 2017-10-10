module Api
  module V1
    module NdcSdg
      class TargetSerializer < ActiveModel::Serializer
        attribute :id
        attribute :number
        attribute :title
        attribute :sectors

        def sectors
          object.sector_ids
        end
      end
    end
  end
end
