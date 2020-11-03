module Api
  module V1
    class KeyVisualizationsController < ApiController
      def index
        visualizations = KeyVisualization.all.order(:order)

        render json: {
          data: visualizations.map { |v| v.as_json(except: [:created_at, :updated_at]) }
        }
      end
    end
  end
end
