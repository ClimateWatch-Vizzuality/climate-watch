module Api
  module V1
    module CaitIndc
      class ValueSerializer < ActiveModel::Serializer
        attribute :value
        attribute :label_id, if: -> { object.label_id }
      end
    end
  end
end
