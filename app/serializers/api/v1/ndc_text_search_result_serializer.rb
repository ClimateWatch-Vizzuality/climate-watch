module Api
  module V1
    class NdcTextSearchResultSerializer < ActiveModel::Serializer
      include Rails.application.routes.url_helpers

      attribute :language
      attribute :translated
      attribute :document_type
      attribute :links
      attribute :linkages
      attribute :matches

      belongs_to :location, serializer: Locations::LocationNanoSerializer

      def links
        {self: text_api_v1_ndc_path(code: object.location.try(:iso_code3))}
      end

      def matches
        if query_present?
          query_matches
        elsif filter_present?
          filter_matches
        end
      end

      def query_matches
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

      def filter_matches
        object.full_text.scan(
          Regexp.new(
            [
              Ndc::PG_SEARCH_HIGHLIGHT_START,
              '(.*?)',
              Ndc::PG_SEARCH_HIGHLIGHT_END
            ].join
          )
        ).flatten.map.with_index do |fragment, idx|
          {
            idx: idx,
            fragment: fragment
          }
        end
      end

      def query_present?
        !@instance_options[:params][:query].nil?
      end

      def filter_present?
        filter = [:target, :goal, :sector].select do |param|
          @instance_options[:params].key?(param)
        end

        filter.length.positive?
      end
    end
  end
end
