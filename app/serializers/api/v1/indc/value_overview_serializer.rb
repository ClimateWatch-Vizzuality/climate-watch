module Api
  module V1
    module Indc
      class ValueOverviewSerializer < ActiveModel::Serializer
        attribute :slug
        attribute :name
        attribute :value
        attribute :document_slug

        def name
          object.indicator.name
        end

        def slug
          object.indicator.slug
        end

        def document_slug
          object.document&.slug
        end
      end
    end
  end
end
