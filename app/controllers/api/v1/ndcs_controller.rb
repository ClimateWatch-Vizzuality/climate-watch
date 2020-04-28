module Api
  module V1
    OVERVIEW_INDICATORS = [
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

    NdcIndicators = Struct.new(:indicators, :categories, :sectors) do
      alias_method :read_attribute_for_serialization, :send
    end

    NdcOverview = Struct.new(:values, :sectors) do
      alias_method :read_attribute_for_serialization, :send
    end

    class NdcsController < ApiController
      # rubocop:disable MethodLength, AbcSize
      def index
        sectors = ::Indc::Sector.
          all

        categories = ::Indc::Category.
          includes(:category_type).
          order(:order)

        # params[:filter] -> ['map', 'table']
        if params[:filter]
          categories = categories.where(
            indc_category_types: {name: params[:filter]}
          )
        end

        indicators = ::Indc::Indicator.
          includes(:labels, :source, :categories,
                   values: [:sector, :label, :location, :document]).
          order(:order)

        # params[:source] -> one of ["CAIT", "LTS", "WB", "NDC Explorer"]
        if params[:source]
          source = ::Indc::Source.where(name: params[:source])
          indicators = indicators.where(source_id: source.map(&:id))
        end

        if params[:category]
          parent = ::Indc::Category.
            includes(:category_type).
            where(
              indc_category_types: {name: 'global'},
              slug: params[:category]
            )

          categories = categories.
            where(
              parent_id: parent.map(&:id)
            )
        end

        categories = categories.where(id: indicators.flat_map(&:category_ids).uniq)

        if location_list
          indicators = indicators.where(
            values: {locations: {iso_code3: location_list}}
          )
        end

        if params[:document]
          indicators = indicators.
            where(values: {indc_documents: {slug: [params[:document], nil]}})
        end

        render json: NdcIndicators.new(indicators, categories, sectors),
               serializer: Api::V1::Indc::NdcIndicatorsSerializer,
               locations_documents: locations_documents
      end
      # rubocop:enable MethodLength, AbcSize

      def content_overview
        location = Location.find_by!(iso_code3: params[:code])

        values = ::Indc::Value.
          includes(:indicator, :location).
          where(
            indc_indicators: {
              slug: OVERVIEW_INDICATORS
            }, locations: {
              iso_code3: params[:code]
            }
          ).
          order('indc_indicators.name')

        sectors = ::Indc::Indicator.
          joins(:values).
          where(slug: SECTORS_INDICATORS).
          where(indc_values: {location_id: location.id}).
          where.not(indc_values: {value: "No specified measure"})

        if params[:document]
          values = values.joins(:document).
            where(indc_documents: {slug: [params[:document], nil]})

          sectors = sectors.joins(values: :document).
            where(indc_documents: {slug: [params[:document], nil]})
        end
       sectors = sectors.order('indc_indicators.name').pluck(:name)


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

      def locations_documents
        return nil unless params[:locations_documents].present?

        params[:locations_documents].split(',').map do |loc_doc|
          loc_doc.split('-')
        end
      end
    end
  end
end
