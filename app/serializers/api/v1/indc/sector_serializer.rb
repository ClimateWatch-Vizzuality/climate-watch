module Api
  module V1
    module Indc
      class SectorSerializer < ActiveModel::Serializer
        attribute :id
        attribute :parent_id, if: -> { object.parent_id }
        attribute :name
        attribute :indicator_ids

        def indicator_ids
          object.values.select(:indicator_id).
            order(:indicator_id).distinct.pluck(:indicator_id)
        end
      end
    end
  end
end
