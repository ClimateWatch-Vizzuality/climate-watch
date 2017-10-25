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

    NdcIndicators = Struct.new(:indicators, :categories, :sectors) do
      alias_method :read_attribute_for_serialization, :send
    end

    NdcOverview = Struct.new(:values, :sectors) do
      alias_method :read_attribute_for_serialization, :send
    end

    class NdcsController < ApiController
      def index
        categories = ::Indc::Category.all
        sectors = ::Indc::Sector.all

        if params[:filter]
          categories = categories.where(
            category_type: params[:filter]
          )
        end

        render json: NdcIndicators.new(indicators, categories, sectors),
               serializer: Api::V1::Indc::NdcIndicatorsSerializer
      end

      def content_overview
        Location.find_by!(iso_code3: params[:code])

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


        sectors = ::Indc::Sector.
          includes(:parent, values: :location).
          where(locations: {iso_code3: params[:code]}).
          map(&:parent).
          map(&:name).
          sort.
          uniq

        render json: NdcOverview.new(values, sectors),
               serializer: Api::V1::Indc::OverviewSerializer
      end

      private

      def indicators
        indicators = ::Indc::Indicator.includes(
          :labels,
          :categories,
          values: [:location]
        )

        if location_list
          indicators = indicators.where(
            values: {locations: {iso_code3: location_list}}
          )
        end

        if params[:filter]
          indicators = indicators.where(
            indc_categories: {category_type: params[:filter]}
          )
        end

        if params[:category]
          indicator_ids = ::GlobalIndc::Category.
            includes(:indicators, children: :indicators).
            where(
              parent_id: nil,
              slug: params[:category]
            ).
            flat_map(&:children).
            flat_map(&:indicators).
            map do |indicator|
              if indicator.wb_indicator_id
                "wb#{indicator.wb_indicator_id}"
              elsif indicator.cait_indicator_id
                "cait#{indicator.cait_indicator_id}"
              end
            end

          indicators = indicators.where(
            id: indicator_ids
          )
        end

        indicators
      end

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
