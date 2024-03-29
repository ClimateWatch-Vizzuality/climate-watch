module Api
  module V1
    class QuantificationsController < ApiController
      def index
        values = ::Quantification::Value.includes(:location, :label)
        values = values.where(locations: {iso_code3: locations}) if locations
        latest_ndc_submissions = ::Indc::Submission.
          latest_ndc_per_location.
          includes(:document).
          group_by(&:location)

        render json: values,
               each_serializer: Api::V1::Quantification::ValueSerializer,
               latest_ndc_submissions: latest_ndc_submissions
      end

      private

      def locations
        params[:location].presence && params[:location].split(',')
      end
    end
  end
end
