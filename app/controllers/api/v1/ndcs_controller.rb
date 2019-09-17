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
      'other_adaption info'
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

        if params[:filter]
          categories = categories.where(
            indc_category_types: {name: params[:filter]}
          )
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

        indicators = ::Indc::Indicator.
          includes(
            :labels, :source, :categories,
            values: [:sector, :label, :location]
          ).
          where(id: categories.flat_map(&:indicator_ids).uniq).
          order(:order)

        if location_list
          indicators = indicators.where(
            values: {locations: {iso_code3: location_list}}
          )
        end

        render json: NdcIndicators.new(indicators, categories, sectors),
               serializer: Api::V1::Indc::NdcIndicatorsSerializer
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
          where.not(indc_values: {value: "No specified measure"}).
          order('indc_indicators.name').pluck(:name)

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
    end
  end
end
