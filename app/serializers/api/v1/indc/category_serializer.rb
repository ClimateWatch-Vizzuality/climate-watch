module Api
  module V1
    module Indc
      class CategorySerializer < ActiveModel::Serializer
        attribute :name
        attribute :slug
        attribute :category_type, key: :type
        attribute :sources

        def category_type
          object.category_type.name
        end

        def sources
          object.sources.distinct.map(&:name)
        end
      end
    end
  end
end
