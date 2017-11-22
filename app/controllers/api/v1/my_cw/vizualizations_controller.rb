module Api
  module V1
    module MyCw
      class VizualizationsController < MyCwController
        before_action :vizualization, only: %w(show update destroy)

        def index
          vizualizations = ::MyCw::Vizualization.where(user_id: @current_user[:user_id])
          render json: vizualizations, each_serializer: Api::V1::MyCw::VizualizationSerializer
        end

        def show
          render json: @vizualization, serializer: Api::V1::MyCw::UserStorySerializer
        end

        def update
          if @vizualization.update(vizualization_params)
            render json: @vizualization, serializer: Api::V1::MyCw::VizualizationSerializer
          else
            render json: resource_error(@vizualization.errors)
          end
        end

        def create
          @vizualization = ::MyCw::Vizualization.new(vizualization_params)
          @vizualization.user_id = @current_user[:user_id]
          if @vizualization.save
            render json: @vizualization, serializer: Api::V1::MyCw::VizualizationSerializer
          else
            resource_error(@vizualization.errors)
          end
        end

        def destroy
          if @vizualization.destroy
            render status: 200
          else
            render json: resource_error(@vizualization.errors)
          end
        end

        private

        def vizualization_params
          params.require(:vizualization).permit(:title, :description, :json_body)
        end

        def vizualization
          @vizualization = ::MyCw::Vizualization.find params[:id]
          render status: 401 unless @vizualization.user_id == @current_user[:user_id]
        end
      end
    end
  end
end
