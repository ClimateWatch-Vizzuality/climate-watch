module Api
  module V1
    module Indc
      class LabelSerializer < ActiveModel::Serializer
        attribute :value, key: :name
        attribute :index
      end
    end
  end
end
