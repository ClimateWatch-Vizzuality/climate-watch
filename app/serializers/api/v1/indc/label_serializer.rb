module Api
  module V1
    module Indc
      class LabelSerializer < ActiveModel::Serializer
        attributes :name
        attributes :index
      end
    end
  end
end
