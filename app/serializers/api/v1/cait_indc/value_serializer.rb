module Api
  module V1
    module CaitIndc
      class ValueSerializer < ActiveModel::Serializer
        attributes :value

        belongs_to :indicator_label,
                   key: :label,
                   serializer: IndicatorLabelSerializer
      end
    end
  end
end
