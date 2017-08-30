module Api
  module V1
    module CaitIndc
      class ValueSerializer < ActiveModel::Serializer
        attributes :value

        belongs_to :label, serializer: LabelSerializer
      end
    end
  end
end
