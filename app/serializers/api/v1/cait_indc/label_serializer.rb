module Api
  module V1
    module CaitIndc
      class LabelSerializer < ActiveModel::Serializer
        attributes :name,
                   :color
      end
    end
  end
end
