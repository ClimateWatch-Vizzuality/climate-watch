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
        indicators = filtered_indicators
        categories = filtered_categories(indicators)
        sectors = ::Indc::Sector.joins(values: :indicator).
          where(indc_indicators: {id: indicators.map(&:id)})
        parents = ::Indc::Sector.where(parent_id: nil).
          joins("INNER JOIN indc_sectors AS children ON children.parent_id = indc_sectors.id").where(children: {id: sectors.pluck(:id).uniq})

        sectors = ::Indc::Sector.from("(#{sectors.to_sql} UNION #{parents.to_sql}) AS indc_sectors").
          includes(values: :indicator)

        render json: NdcIndicators.new(indicators, categories, sectors),
               serializer: Api::V1::Indc::NdcIndicatorsSerializer,
               locations_documents: @locations_documents,
               lse_data: get_lse_data
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

        if params[:document]
          values = values.joins(:document).
            where(indc_documents: {slug: [params[:document], nil]})
        end

        if SECTORS_INDICATORS.present?
          sectors = ::Indc::Indicator.
            joins(:values).
            where(slug: SECTORS_INDICATORS).
            where(indc_values: {location_id: location.id}).
            where.not(indc_values: {value: "No specified measure"})

          if params[:document]
            sectors = sectors.joins(values: :document).
              where(indc_documents: {slug: [params[:document], nil]})
          end
          sectors = sectors.order('indc_indicators.name').pluck(:name)
        end

        render json: NdcOverview.new(values, sectors),
               serializer: Api::V1::Indc::OverviewSerializer
      end

      private

      def location_list
        if params[:location].blank?
          nil
        else
          params[:location].split(',')
        end
      end

      def set_locations_documents
        return nil unless params[:locations_documents].present?

        @locations_documents = params[:locations_documents].split(',').map do |loc_doc|
          loc_doc.split('-')
        end
        @indc_locations_documents = @locations_documents.select{ |ld| !['framework', 'sectoral'].include?(ld[1].split('_').first)}.presence
        @lse_locations_documents = @locations_documents.select{ |ld| ['framework', 'sectoral'].include?(ld[1].split('_').first)}.presence
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

      def filtered_indicators
        indicators = ::Indc::Indicator.includes(:labels, :source, :categories,
                                                values: [:sector, :label, :location,
                                                         :document])

        if location_list
          indicators = indicators.where(values: {locations: {iso_code3: location_list}})
        end

        if params[:document].present?
          indicators = indicators.where(values: {indc_documents: {slug: [params[:document], nil]}})
        end

        # params[:source] -> one of ["CAIT", "LTS", "WB", "NDC Explorer", "Pledges"]
        if params[:source].present?
          source = ::Indc::Source.where(name: params[:source])
          indicators = indicators.where(source_id: source.map(&:id))
        end

        if @indc_locations_documents
          indicators = indicators.select('DISTINCT ON(COALESCE("normalized_slug", indc_indicators.slug)) indc_indicators.*')
          indicators = indicators.joins(values: [:location, :document]).
            where(locations: {iso_code3: @indc_locations_documents.map(&:first)},
                  indc_documents: {slug: @indc_locations_documents.map(&:second)})
        end

        if !@indc_locations_documents && @lse_locations_documents
          indicators = indicators.select('DISTINCT ON(COALESCE("normalized_slug", indc_indicators.slug)) indc_indicators.*')
          indicators = indicators.joins(values: [:location]).
            where(normalized_slug: LSE_INDICATORS_MAP.keys.map(&:to_s)).
            where(locations: {iso_code3: @lse_locations_documents.map(&:first)})
        end

        if params[:indicators].present?
          indicators = indicators.where(slug: params[:indicators].split(','))
        end

        if params[:category].present?
          parent = ::Indc::Category.includes(:category_type).
            where(indc_category_types: {name: 'global'}, slug: params[:category])
          indicators = indicators.joins(:categories).where(indc_categories: {parent_id: parent.map(&:id)})
        end
        indicators.sort_by{|i| i.order}
      end

      def filtered_categories(indicators)
        categories = ::Indc::Category.includes(:category_type).order(:order)

        # params[:filter] -> ['map', 'table']
        if params[:filter].present?
          categories = categories.where(indc_category_types: {name: params[:filter]})
        end

        if params[:category].present?
          parent = ::Indc::Category.includes(:category_type).
            where(indc_category_types: {name: 'global'}, slug: params[:category])

          categories = categories.where(parent_id: parent.map(&:id))
        end

        categories.where(id: indicators.flat_map(&:category_ids).uniq)
      end
    end
  end
end
