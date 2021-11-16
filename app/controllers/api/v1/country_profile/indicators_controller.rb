module Api
  module V1
    module CountryProfile
      class IndicatorsController < ApiController
        def index
          indicators = ::CountryProfile::Indicator.all.includes(values: :location)

          if params[:location].present?
            indicators = indicators.where(
              values: {locations: {iso_code3: params[:location].split(',')}}
            )
          end
          indicators = indicators.where(slug: params[:indicator].split(',')) if params[:indicator].present?

          render json: indicators,
                 adapter: :json,
                 each_serializer: Api::V1::CountryProfile::IndicatorSerializer,
                 root: :data
        end
      end
    end
  end
end
