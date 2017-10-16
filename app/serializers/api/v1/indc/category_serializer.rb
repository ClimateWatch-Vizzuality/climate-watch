module Api
  module V1
    module Indc
      class CategorySerializer < ActiveModel::Serializer
        attribute :name
        attribute :source
        attribute :slug
        attribute :category_type, key: :type
      end
    end
  end
end
