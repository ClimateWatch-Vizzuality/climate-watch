module Api
  module V1
    module MyCw
      class VisualizationsController < MyCwController
        before_action :visualization, only: %w(show update destroy)

        def index
          visualizations = ::MyCw::Visualization.where(user_id: @current_user[:user_id])
          render json: visualizations, each_serializer: Api::V1::MyCw::VisualizationSerializer
        end

        def show
          render json: @visualization, serializer: Api::V1::MyCw::UserStorySerializer
        end

        def update
          if @visualization.update(visualization_params)
            render json: @visualization, serializer: Api::V1::MyCw::VisualizationSerializer
          else
            render json: resource_error(@visualization.errors)
          end
        end

        def create
          @visualization = ::MyCw::Visualization.new(visualization_params)
          @visualization.user = @current_user[:user_id]
          if @visualization.save
            render json: @visualization, serializer: Api::V1::MyCw::VisualizationSerializer
          else
            resource_error(@visualization.errors)
          end
        end

        def destroy
          if @visualization.destroy
            render json: { status: 200 }
          else
            render json: resource_error(@visualization.errors)
          end
        end

        private

        def visualization_params
          params.require(:visualization).permit(:title, :description, json_body: {})
        end

        def visualization
          @visualization = ::MyCw::Visualization.find params[:id]
          render status: 401 unless @visualization.user == @current_user[:user_id]
        end
      end
    end
  end
end
