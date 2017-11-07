module Api
  module V1
    class NdcTextsController < ApiController
      def index
        ndcs = Ndc.includes(:location)
        ndcs =
          if params[:target] || params[:goal] || params[:sector]
            with_linkage_highlights(ndcs, false, false)
          elsif params[:query]
            with_highlights(ndcs, false, false)
          else
            ndcs
          end

        render json: ndcs,
               each_serializer: Api::V1::NdcTextSearchResultSerializer,
               params: params
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

      def highlight_text(text, linkages)
        return text unless linkages.length.positive?

        indices = linkages.reduce([]) do |list, linkage|
          list.push(linkage.starts_at, linkage.ends_at)
        end

        if indices.length.positive?
          indices.unshift(1)
          indices.push(text.length)
        end

        parts = indices.each_cons(2).map.with_index do |(i1, i2), idx|
          if idx % 2 == 0 && idx == 0
            text[i1..(i2-1)]
          elsif idx % 2 == 0
            text[(i1+1)..(i2-1)]
          else
            text[i1..i2]
          end
        end

        idx = 0
        parts.reduce("") do |memo, part|
          memo +=
            if idx % 2 > 0
              [
                Ndc::PG_SEARCH_HIGHLIGHT_START,
                part,
                Ndc::PG_SEARCH_HIGHLIGHT_END
              ].join
            else
              part
            end
          idx += 1
          memo
        end
      end

      def with_linkage_highlights(
        ndcs,
        include_not_matched = true,
        highlight_matches = true
      )
        linkages = Ndc.linkages(params)

        unless include_not_matched
          if params[:target]
            ids = ::NdcSdg::Target.
              includes(:ndc_targets).
              find_by!(number: params[:target]).
              ndc_targets.
              map(&:ndc_id).
              uniq
            ndcs = ndcs.where(id: ids)
          end

          if params[:goal]
            ids = ::NdcSdg::Goal.
              includes(targets: :ndc_targets).
              find_by!(number: params[:goal]).
              targets.
              flat_map(&:ndc_targets).
              map(&:ndc_id).
              uniq
            ndcs = ndcs.where(id: ids)
          end

          if params[:sector]
            ids = ::NdcSdg::Sector.
              includes(:ndc_targets).
              find_by!(id: params[:sector]).
              ndc_targets.
              map(&:ndc_id).
              uniq
            ndcs = ndcs.where(id: ids)
          end
        end

        ndcs.map do |ndc|
          ndc_linkages = linkages.
            select { |linkage| linkage.ndc_id == ndc.id }

          ndc.linkages = ndc_linkages.map(&:indc_text)

          ndc.full_text = highlight_text(ndc.full_text, ndc_linkages)
          ndc.readonly!
          ndc
        end
      end
    end
  end
end
