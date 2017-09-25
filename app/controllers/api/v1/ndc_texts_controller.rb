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
        ndcs = with_highlights(ndcs, true, true)
        render json: ndcs,
               each_serializer: Api::V1::NdcTextSerializer
      end

      private

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
    end
  end
end
