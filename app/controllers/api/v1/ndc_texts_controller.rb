module Api
  module V1
    class NdcTextsController < ApiController
      def index
        ndcs = Ndc.includes(:location)
        ndcs = with_highlights(ndcs, false, false)
        render json: ndcs,
               each_serializer: Api::V1::NdcTextSearchResultSerializer,
               query: params[:query]
      end

      def show
        ndcs = Ndc.joins(:location).where(
          locations: {iso_code3: params[:code].upcase}
        )

        ndcs =
          if params[:target] || params[:goal] || params[:sector]
            with_linkage_highlights(ndcs)
          elsif params[:query]
            with_highlights(ndcs, true, true)
          else
            ndcs
          end

        render json: ndcs,
               each_serializer: Api::V1::NdcTextSerializer
      end

      private

      def with_highlights(
        ndcs,
        highlights_in_full = false,
        include_not_matched = false
      )
        highlighted_ndcs =
          if highlights_in_full
            ndcs.with_highlights_in_full(params[:query])
          else
            ndcs.with_highlights_in_fragments(params[:query])
          end.with_pg_search_highlight

        if include_not_matched
          highlighted_ndcs = ndcs.map do |ndc|
            highlighted_ndcs.find do |h_ndc|
              ndc.id == h_ndc.id
            end || ndc
          end
        end

        highlighted_ndcs
      end

      def highlight_text(text, highlights)
        return text unless highlights.length.positive?
        text.gsub(
          Regexp.new(
            "(#{highlights.map { |t| "(?:#{Regexp.escape(t)})" }.join('|')})",
            'i'
          ),
          [
            Ndc::PG_SEARCH_HIGHLIGHT_START,
            '\1',
            Ndc::PG_SEARCH_HIGHLIGHT_END
          ].join
        )
      end

      def with_linkage_highlights(
        ndcs,
        include_not_matched = true
      )
        texts = Ndc.linkage_texts(params)

        unless include_not_matched
          ndcs = ndcs.where(
            (['full_text ILIKE ?'] * texts.length).join(' OR '),
            *texts.map { |t| "%#{t}%" }
          )
        end

        ndcs.map do |ndc|
          ndc.linkages = texts.reject do |text|
            ndc.full_text.at(text).nil?
          end
          ndc.full_text = highlight_text(ndc.full_text, texts)
          ndc.readonly!
          ndc
        end
      end
    end
  end
end
