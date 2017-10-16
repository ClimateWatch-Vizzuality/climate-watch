module Api
  module V1
    class AdaptationsController < ApiController
      def index
        variables = ::Adaptation::Variable.
          includes(values: [:location])

        if location_list
          variables = variables.where(
            values: {locations: {iso_code3: location_list}}
          )
        end

        render json: variables,
               each_serializer: Api::V1::Adaptation::VariableSerializer
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
