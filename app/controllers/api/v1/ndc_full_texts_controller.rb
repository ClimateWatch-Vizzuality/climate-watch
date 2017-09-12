module Api
  module V1
    class NdcFullTextsController < ApiController
      def index
        @ndcs = Ndc.includes(:location)
        apply_temporary_hack
        @ndcs = apply_query_with_highlights(@ndcs, false)
        render json: @ndcs,
               each_serializer: Api::V1::NdcFullTextSearchResultSerializer,
               query: params[:query]
      end

      def show
        ndcs = Ndc.joins(:location).where(
          'locations.iso_code3' => params[:code].upcase
        )
        ndcs_highlighted = apply_query_with_highlights(ndcs, true)
        @ndc = ndcs_highlighted.first || ndcs.first
        unless @ndc
          render json: {
            error: 'NDC not found',
            status: 404
          }, status: :not_found and return
        end
        render json: @ndc,
               serializer: Api::V1::NdcFullTextSerializer
      end

      private

      def apply_query_with_highlights(ndcs, highlights_in_full = false)
        if params[:query]
          ndcs =
            if highlights_in_full
              ndcs.with_highlights_in_full(params[:query])
            else
              ndcs.with_highlights_in_fragments(params[:query])
            end
          ndcs = ndcs.with_pg_search_highlight
        end
        ndcs
      end

      def apply_temporary_hack
        # temporary hack to only return a single document per country
        query = <<~EOT
          WITH obsolete_ndcs AS (
            SELECT min_id, dup_id FROM (
              SELECT min_id, UNNEST(duplicated_ids) AS dup_id FROM (
                SELECT MIN(id) AS min_id, ARRAY_AGG(id) AS duplicated_ids, COUNT(*)
                FROM ndcs
                GROUP BY (location_id)
                HAVING COUNT(*) > 1
              ) s
            ) ss
            WHERE ss.dup_id != ss.min_id
          ) SELECT ARRAY_AGG(dup_id) AS dup_ids FROM obsolete_ndcs
        EOT
        result = Ndc.find_by_sql(query)
        dup_ids = result.first && result.first['dup_ids'] || []
        @ndcs = @ndcs.where('id NOT IN (?)', dup_ids) if dup_ids.any?
        # end of temporary hack
      end
    end
  end
end
