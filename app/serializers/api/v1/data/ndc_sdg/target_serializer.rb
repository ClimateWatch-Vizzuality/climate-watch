module Api
  module V1
    module Data
      module NdcSdg
        class TargetSerializer < ActiveModel::Serializer
          attribute :id
          attribute :goal_id
          attribute :number
          attribute :title

          has_many :sectors
        end
      end
    end
  end
end
