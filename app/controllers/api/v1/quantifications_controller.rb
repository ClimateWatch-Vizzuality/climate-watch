module Api
  module V1
    class QuantificationsController < ApiController
      def index
        values = ::Quantification::Value.includes(:location, :label)
        values = values.where(locations: {iso_code3: locations}) if locations
        latest_submissions = ::Indc::Submission.latest_per_location.includes(:document).group_by(&:location)

        render json: values,
               each_serializer: Api::V1::Quantification::ValueSerializer,
               latest_submissions: latest_submissions
      end

      private

      def locations
        params[:location].presence && params[:location].split(',')
      end
    end
  end
end
