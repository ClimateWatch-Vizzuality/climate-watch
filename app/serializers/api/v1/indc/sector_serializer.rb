module Api
  module V1
    module Indc
      class SectorSerializer < ActiveModel::Serializer
        attribute :id
        attribute :parent_id, if: -> { object.parent_id }
        attribute :name
      end
    end
  end
end

