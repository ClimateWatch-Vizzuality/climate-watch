module Api
  module V1
    module Indc
      class OverviewValueSerializer < ActiveModel::Serializer
        attribute :slug
        attribute :name
        attribute :value

        def name
          object.indicator.name
        end

        def slug
          object.indicator.slug
        end
      end
    end
  end
end
