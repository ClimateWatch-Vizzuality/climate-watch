module Api
  module V1
    module CaitIndc
      class CategorySerializer < ActiveModel::Serializer
        attribute :name
        attribute :slug
      end
    end
  end
end
