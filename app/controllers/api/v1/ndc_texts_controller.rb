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
          if params[:target]
            with_linkage_highlights(ndcs)
          else
            with_highlights(ndcs, true, true)
          end

        render json: ndcs,
               each_serializer: Api::V1::NdcTextSerializer
      end

      private

      def linkage_texts(target, location = nil)
        query_params = {
          ndc_sdg_targets: {
            number: target
          }
        }

        if location
          query_params[:locations] = {
            iso_code3: location
          }
        end

        ::NdcSdg::NdcTarget.includes(
          :target,
          ndc: :location
        ).where(query_params).
          map(&:indc_text)
      end

      def with_highlights(
        ndcs,
        highlights_in_full = false,
        include_not_matched = false
      )
        return ndcs unless params[:query]

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
        text.gsub(
          Regexp.new("(#{highlights.map { |t| "(?:#{t})" }.join('|')})", 'i'),
          [
            Ndc::PG_SEARCH_HIGHLIGHT_START,
            '\1',
            Ndc::PG_SEARCH_HIGHLIGHT_END
          ].join
        )
      end

      def with_linkage_highlights(ndcs)
        return ndcs unless params[:target]

        texts = linkage_texts(params[:target], params[:code].upcase)

        ndcs.where(
          (['full_text ILIKE ?'] * texts.length).join(' OR '),
          *texts.map { |t| "%#{t}%" }
        ).map do |ndc|
          ndc.full_text = highlight_text(ndc.full_text, texts)
          ndc.readonly!
          ndc
        end
      end
    end
  end
end
