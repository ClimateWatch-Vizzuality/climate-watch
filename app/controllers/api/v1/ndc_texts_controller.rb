module Api
  module V1
    class NdcTextsController < ApiController
      def index
        total_ndc_count = Ndc.all.where(document_type: 'ndc').count
        total_indc_count = Ndc.all.where(document_type: 'indc').count
        doc_types = ::Indc::Document.select(:slug).distinct
        ndcs = Ndc.includes(:location).where(document_type: doc_types)
        ndcs =
          if params[:target] || params[:goal] || params[:sector]
            with_linkage_highlights(ndcs, false)
          elsif params[:query]
            with_highlights(ndcs, false, false)
          else
            ndcs
          end

        render json: ndcs,
               adapter: :json,
               each_serializer: Api::V1::NdcTextSearchResultSerializer,
               params: params,
               meta:
                 {
                   total_ndc_count: total_ndc_count,
                   total_indc_count: total_indc_count
                 }
      end

      def show
        doc_types = ::Indc::Document.select(:slug).distinct
        ndcs = Ndc.joins(:location).where(
          document_type: doc_types,
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

      def highlight_indices(linkages, text_length)
        indices = linkages.reduce([]) do |list, linkage|
          list.push(linkage.starts_at, linkage.ends_at)
        end

        if indices.length.positive?
          indices.unshift(0)
          indices.push(text_length)
        end

        indices
      end

      def highlight_text(text, linkages)
        return text unless linkages.length.positive?

        parts = highlight_indices(linkages, text.length).
          each_cons(2).
          map.with_index do |(i1, i2), idx|
            if idx.zero?
              text[i1..(i2 - 1)]
            elsif idx.even?
              text[(i1 + 1)..(i2 - 1)]
            else
              text[i1..i2]
            end
          end

        parts.each.with_index.reduce('') do |memo, (part, idx)|
          memo +
            if idx.even?
              part
            else
              [
                Ndc::PG_SEARCH_HIGHLIGHT_START,
                part,
                Ndc::PG_SEARCH_HIGHLIGHT_END
              ].join
            end
        end
      end

      # rubocop:disable AbcSize
      def with_linkage_highlights(
        ndcs,
        include_not_matched = true
      )
        unless include_not_matched
          ndcs = ndcs.where(id: ::NdcSdg::Target.ndc_ids(params[:target])) if params[:target]
          ndcs = ndcs.where(id: ::NdcSdg::Goal.ndc_ids(params[:goal])) if params[:goal]
          ndcs = ndcs.where(id: ::NdcSdg::Sector.ndc_ids(params[:sector])) if params[:sector]
        end

        ndcs.map do |ndc|
          linkages = Ndc.linkages(params, ndc)
          ndc_linkages = linkages.
            select { |linkage| linkage.ndc_id == ndc.id }

          ndc.linkages = ndc_linkages.map(&:indc_text)

          ndc.full_text = highlight_text(ndc.full_text, ndc_linkages)
          ndc.readonly!
          ndc
        end
      end
      # rubocop:enable AbcSize
    end
  end
end
