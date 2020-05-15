module Api
  module V1
    LtsOverview = Struct.new(:values) do
      alias_method :read_attribute_for_serialization, :send
    end

    class LtsController < Api::V1::NdcsController
      SUMMARY_INDICATORS = [
        'lts_vision',
        'lts_document',
        'lts_date',
        'lts_target',
        'lts_m_tt',
        'lts_a_otc'
      ].freeze

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

        render json: LtsOverview.new(values),
               serializer: Api::V1::Indc::LtsOverviewSerializer
      end
    end
  end
end
