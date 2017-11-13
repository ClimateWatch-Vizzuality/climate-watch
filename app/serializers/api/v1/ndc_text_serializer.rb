module Api
  module V1
    class NdcTextSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers

      attribute :id
      attribute :language
      attribute :translated
      attribute :document_type
      attribute :links
      attribute :linkages
      attribute :html

      belongs_to :location, serializer: Api::V1::LocationNanoSerializer

      def links
        {self: text_api_v1_ndc_path(code: object.location.try(:iso_code3))}
      end

      def linkages
        object.linkages || []
      end

      def html
        if highlights_present?
          object.pg_search_highlight.html_safe
        else
          object.full_text.html_safe
        end
      end

      def highlights_present?
        object.pg_search_highlight
        true
      rescue PgSearch::PgSearchHighlightNotSelected
        false
      end
    end
  end
end
