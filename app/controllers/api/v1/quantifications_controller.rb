module Api
  module V1
    class QuantificationsController < ApiController
      def index
        values = ::Quantification::Value.includes(:location, :label)
        values = values.where(locations: {iso_code3: locations}) if locations

        render json: values,
               each_serializer: Api::V1::Quantification::ValueSerializer
      end

      private

      def locations
        params[:location].presence && params[:location].split(',')
      end
    end
  end
end
