module Api
  module V1
    module Indc
      class ValueSerializer < ActiveModel::Serializer
        attribute :value
        attribute :label_id, if: -> { object.label_id }
        attribute :label_slug, if: -> { object.label&.slug }
        attribute :sector_id, if: -> { object.sector_id }
        attribute :document_slug

        def label_slug
          object.label&.slug
        end

        def document_slug
          object.document&.slug
        end
      end
    end
  end
end
