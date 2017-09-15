module Api
  module V1
    class AdaptationsController < ApiController
      def index
        variables = ::Adaptation::Variable.
          includes(values: [:location])

        render json: variables,
               each_serializer: Api::V1::Adaptation::VariableSerializer
      end
    end
  end
end
