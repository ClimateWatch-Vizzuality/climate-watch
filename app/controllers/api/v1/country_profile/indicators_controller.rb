module Api
  module V1
    module CountryProfile
      class IndicatorsController < ApiController
        def index
          indicators = ::CountryProfile::Indicator.all.includes(values: :location)
          indicators = indicators.where(slug: params[:indicator].split(',')) if params[:indicator].present?

          render json: indicators,
                 adapter: :json,
                 each_serializer: Api::V1::CountryProfile::IndicatorSerializer,
                 root: :data,
                 locations: params[:location] && params[:location].split(',')
        end
      end
    end
  end
end
