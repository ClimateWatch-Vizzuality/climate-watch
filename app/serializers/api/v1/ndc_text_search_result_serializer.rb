module Api
  module V1
    class NdcTextSearchResultSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers

      attributes :language, :document_type, :links
      attribute :matches, if: :query_present?
      belongs_to :location, serializer: Api::V1::LocationNanoSerializer

      def links
        {self: text_api_v1_ndc_path(code: object.location.try(:iso_code3))}
      end

      def matches
        highlight_idx = 0
        object.pg_search_highlight.split(
          Ndc::PG_SEARCH_HIGHLIGHT_FRAGMENT_DELIMITER
        ).map do |fragment|
          match = {
            idx: highlight_idx,
            fragment: fragment
          }
          # there can be more than one highlight per fragment
          # we're only interested in the position of the first highlight
          regexp = <<~EOT.strip
            #{Ndc::PG_SEARCH_HIGHLIGHT_START}.+?#{Ndc::PG_SEARCH_HIGHLIGHT_END}
          EOT
          number_of_matches = fragment.scan(/#{regexp}/).length
          highlight_idx += number_of_matches
          match
        end
      end

      def query_present?
        @instance_options[:query].present?
      end
    end
  end
end
