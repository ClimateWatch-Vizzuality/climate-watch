module Api
  module V1
    module NdcSdg
      class GoalMetaSerializer < ActiveModel::Serializer
        attribute :id
        attribute :number
        attribute :title
        attribute :cw_title
        attribute :colour
      end
    end
  end
end
