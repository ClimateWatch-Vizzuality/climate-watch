module Api
  module V1
    module Data
      module NdcSdg
        class GoalSerializer < ActiveModel::Serializer
          attribute :id
          attribute :number
          attribute :title
          attribute :cw_title

          has_many :targets
        end
      end
    end
  end
end
