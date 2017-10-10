module Api
  module V1
    module CaitIndc
      class LabelSerializer < ActiveModel::Serializer
        attributes :name
        attributes :index
      end
    end
  end
end
