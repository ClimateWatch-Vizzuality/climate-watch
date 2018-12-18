module Api
  module V1
    class UpdatesController < ApiController
      def index
        updates = Update.order(:updated_at).reverse.first(3)
        render json: updates, each_serializer: Api::V1::UpdateSerializer
      end
    end
  end
end
