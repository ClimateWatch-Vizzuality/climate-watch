module Api
  module V1
    SUMMARY_INDICATORS = [
      'ghg_target_type',
      'time_target_year',
      'non_ghg_target',
      'indc_summary',
      'indc_summary_long',
      'coverage_sectors',
      'coverage_sectors_short',
      'other_adaption info',
      'mitigation_contribution_type',
      'ghg_target_type',
      'adaptation'
    ].freeze

    SECTORS_INDICATORS = [
      'a_agriculture',
      'a_coastal_zone',
      'a_cross_cutting_area',
      'a_drm',
      'a_education',
      'a_energy',
      'a_environment',
      'a_health',
      'a_lulucf',
      'a_social_development',
      'a_tourism',
      'a_transport',
      'a_urban',
      'a_water'
    ].freeze

    LSE_INDICATORS_MAP = {
      nrm_summary: 'description',
      nrm_type_of_commitment: 'ghg_target',
      nrm_ghg_target_type: 'type',
      nrm_base_year: 'base_year_period',
      nrm_target_year: 'year',
      nrm_target_multiplicity: 'single_year',
      nrm_link: 'source'
    }.freeze

    LSE_API = 'https://climate-laws.org/cclow/api/targets'.freeze

    NdcIndicators = Struct.new(:indicators, :categories, :sectors) do
      alias_method :read_attribute_for_serialization, :send
    end

    NdcOverview = Struct.new(:values, :sectors) do
      alias_method :read_attribute_for_serialization, :send
    end

    class NdcsController < ApiController
      before_action :set_locations_documents, only: [:index]

      def index
        json = if index_cache_key.present?
                 Rails.cache.fetch(index_cache_key, expires: 7.days) do
                   index_json
                 end
               else
                 index_json
               end

        render json: json
      end

      def content_overview
        location = Location.find_by!(iso_code3: params[:code])

        values = ::Indc::Value.
          includes(:indicator, :location).
          where(
            indc_indicators: {
              slug: SUMMARY_INDICATORS
            }, locations: {
              iso_code3: params[:code]
            }
          ).
          order('indc_indicators.name')

        docs = [nil]
        docs += if params[:document].present?
                [params[:document]]
              else
                location.documents.where(is_ndc: true).order(ordering: :desc).
                  limit(1).pluck(:slug)
              end

        values = values.joins(:document).where(indc_documents: {slug: docs})

        if SECTORS_INDICATORS.present?
          sectors = ::Indc::Indicator.
            joins(:values).
            where(slug: SECTORS_INDICATORS).
            where(indc_values: {location_id: location.id}).
            where.not(indc_values: {value: "No specified measure"})

          sectors = sectors.joins(values: :document).where(indc_documents: {slug: docs})

          sectors = sectors.order('indc_indicators.name').pluck(:name)
        end

        render json: NdcOverview.new(values, sectors),
               serializer: Api::V1::Indc::OverviewSerializer
      end

      private

      def indicators_cache_key
        [
          params[:source],
          params[:document],
          params[:location],
          params[:indicators],
          params[:category],
          params[:subcategory],
          params[:locations_documents],
          ::Indc::Indicator.maximum(:updated_at).to_s
        ].join('_')
      end

      def categories_cache_key
        [
          params[:source],
          params[:filter],
          params[:category],
          params[:subcategory],
          params[:locations_documents],
          ::Indc::Category.maximum(:updated_at).to_s
        ].join('_')
      end

      def sectors_cache_key
        [
          indicators_cache_key,
          ::Indc::Sector.maximum(:updated_at).to_s
        ].join('_')
      end

      def index_json
        # params[:source] -> one of ["CAIT", "LTS", "WB", "NDC Explorer", "Pledges"]
        if params[:source].present?
          source = ::Indc::Source.where(name: params[:source])
        end

        categories = Rails.cache.fetch(categories_cache_key, expires: 7.days) do
          filtered_categories(source)
        end

        indicators = Rails.cache.fetch(indicators_cache_key, expires: 7.days) do
          filtered_indicators(source)
        end

        sectors = Rails.cache.fetch(sectors_cache_key, expires: 7.days) do
          tmp_sectors = ::Indc::Sector.joins(values: :indicator).
            where(indc_indicators: {id: indicators.map(&:id)}).distinct

          parents = ::Indc::Sector.where(parent_id: nil).
            joins("INNER JOIN indc_sectors AS children ON children.parent_id = indc_sectors.id").where(children: {id: tmp_sectors.pluck(:id).uniq})

          ::Indc::Sector.from("(#{tmp_sectors.to_sql} UNION #{parents.to_sql}) AS indc_sectors")
        end

        Api::V1::Indc::NdcIndicatorsSerializer.new(
          NdcIndicators.new(indicators, categories, sectors),
          locations_documents: @locations_documents,
          location_list: location_list,
          document: params[:document],
          lse_data: get_lse_data,
          filter: params[:filter]
        ).to_json
      end

      def index_cache_key
        return if params[:location].present?
        return if params[:locations_documents].present?
        return if params[:document].present?
        return if params[:category].present?
        return if params[:subcategory].present?
        return if params[:indicators].present?

        [
          request.url,
          ::Indc::Indicator.maximum(:updated_at).to_s # to be sure its reloaded after any import
        ].join('_')
      end

      def location_list
        if params[:location].blank?
          nil
        else
          params[:location].split(',')
        end
      end

      def set_locations_documents
        return unless params[:locations_documents].present?

        @locations_documents = params[:locations_documents].split(',').map do |loc_doc|
          loc_doc.split('-')
        end
        @locations_documents.reject! { |ld| ld.first == 'undefined' }

        lse_documents_prefixes = %w(framework sectoral)

        @indc_locations_documents = @locations_documents.
          select { |ld| lse_documents_prefixes.exclude?(ld[1].split('_').first) }.presence
        @lse_locations_documents = @locations_documents.
          select { |ld| lse_documents_prefixes.include?(ld[1].split('_').first) }.presence
      end

      def get_lse_data
        return nil unless @lse_locations_documents

        lse_data = []
        @lse_locations_documents.each do |iso, data|
          _, law_id = data.split('_')
          laws_and_policies = SingleRecordFetcher.new(LSE_API, iso, iso).call
          laws_and_policies['targets'].each do |t|
            if t['sources'].map{|p| p['id']}.include?(law_id.to_i)
              lse_data << t
            end
          end
        end
        lse_data
      end

      def filtered_indicators(source=nil)
        indicators = ::Indc::Indicator.all

        if location_list
          indicators = indicators.joins(values: [:location]).where(values: {locations: {iso_code3: location_list}})
        end

        if params[:document].present?
          # this needs to be a left join, otherwise we're missing indicators which do not have a document attached
          # which is what the where condition is about
          # for example, indicators under Overview -> UNFCCC Process, e.g. pa_status
          # whose values come from NDC_single_version data file
          indicators = indicators.left_joins(values: [:document]).where(values: {indc_documents: {slug: [params[:document], nil]}})
        end

        indicators = indicators.where(source_id: source.map(&:id)) if source

        if params[:indicators].present?
          indicators = indicators.where(slug: params[:indicators].split(','))
        end

        # seems like when filter for map we need more indicators which are not in map category
        # so I cannot just pass filtered categories here
        if params[:category].present?
          parent = ::Indc::Category.includes(:category_type).
            where(indc_category_types: {name: 'global'}, slug: params[:category])
          indicators = indicators.joins(:categories).where(indc_categories: {parent_id: parent.map(&:id)})
        end

        if params[:subcategory].present?
          indicators = indicators.joins(:categories).where(indc_categories: {slug: params[:subcategory]})
        end

        if @lse_locations_documents
          lse_indicators = indicators.
            joins(:categories).
            where("indc_indicators.slug LIKE 'lse_%'")
        end

        if @indc_locations_documents
          # if indicator belongs to many cateogires then only one will be in category_ids
          # that's why I'm going to reset the query at the end
          indicators = indicators.select('DISTINCT ON(COALESCE("normalized_slug", indc_indicators.slug)) indc_indicators.*')
          document_location_sql = @indc_locations_documents.map do
            '(locations.iso_code3 = ? AND indc_documents.slug = ?)'
          end.join(' OR ')
          document_location_args = @indc_locations_documents.flatten

          indicators = indicators.
            joins(values: [:location, :document]).
            where(document_location_sql, *document_location_args)

          if lse_indicators
            indicators = ::Indc::Indicator.
              select('DISTINCT ON(COALESCE("normalized_slug", indc_indicators.slug)) indc_indicators.*').
              from("(#{indicators.to_sql} UNION #{lse_indicators.to_sql}) AS indc_indicators")
          end
        elsif lse_indicators
          indicators = lse_indicators
        end

        # to not break distinct on clause
        if @indc_locations_documents || @lse_locations_documents
          indicator_ids = indicators.map(&:id).uniq
        else
          indicator_ids = indicators.ids
        end

        # better this way to reset all those joins
        # to get all category_ids for indicator has many and belongs for example
        ::Indc::Indicator.
          includes(:labels, :source, :categories).
          where(id: indicator_ids).
          order(:order)
      end

      def filtered_categories(source=nil)
        categories = ::Indc::Category.includes(:category_type, :sources)

        # params[:filter] -> ['map', 'table', 'overview']
        if params[:filter].present?
          categories = categories.where(indc_category_types: {name: params[:filter]})
        end

        if params[:category].present?
          parent = ::Indc::Category.includes(:category_type).
            where(indc_category_types: {name: 'global'}, slug: params[:category])

          categories = categories.where(parent_id: parent.map(&:id))
        end

        categories = categories.where(slug: params[:subcategory]) if params[:subcategory].present?

        if source
          categories = categories.joins(:indicators).
            where(indc_indicators: {source_id: source.map(&:id)})
        end

        if @indc_locations_documents
          categories = categories.joins(indicators: {values: [:document, :location]}).
            where(indc_documents: {slug: @indc_locations_documents.map(&:second)}).
            where(locations: {iso_code3: @indc_locations_documents.map(&:first)})
        end

        categories.order(:order).distinct
      end
    end
  end
end
