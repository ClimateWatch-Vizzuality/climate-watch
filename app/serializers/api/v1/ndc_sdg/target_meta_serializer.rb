module Api
  module V1
    module NdcSdg
      class TargetMetaSerializer < ActiveModel::Serializer
        attribute :id
        attribute :number
        attribute :title
        attribute :sectors
        attribute :goal_number

        def sectors
          object.sector_ids
        end

        def goal_number
          object.goal.number
        end
      end
    end
  end
end
