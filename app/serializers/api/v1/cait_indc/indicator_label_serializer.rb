module Api
  module V1
    module CaitIndc
      class IndicatorLabelSerializer < ActiveModel::Serializer
        attributes :name,
                   :color
      end
    end
  end
end
