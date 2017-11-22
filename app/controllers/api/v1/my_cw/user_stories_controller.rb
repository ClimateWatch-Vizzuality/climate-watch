module Api
  module V1
    module MyCw
      class UserStoriesController < MyCwController
        before_action :user_story, only: %w(show update destroy)

        def index
          user_stories = ::MyCw::UserStory.where(user_id: @current_user[:user_id])
          render json: user_stories, each_serializer: Api::V1::MyCw::UserStorySerializer
        end

        def show
          render json: @user_story, serializer: Api::V1::MyCw::UserStorySerializer
        end

        def update
          if @user_story.update(user_story_params)
            render json: @user_story, serializer: Api::V1::MyCw::UserStorySerializer
          else
            render json: resource_error(@user_story.errors)
          end
        end

        def create
          @user_story = ::MyCw::UserStory.new(user_story_params)
          @user_story.user_id = @current_user[:user_id]
          if @user_story.save
            render json: @user_story, serializer: Api::V1::MyCw::UserStorySerializer
          else
            resource_error(@user_story.errors)
          end
        end

        def destroy
          if @user_story.destroy
            render status: 200
          else
            render json: resource_error(@user_story.errors)
          end
        end

        private

        def user_story_params
          params.require(:user_story).permit(:title, :body, :public)
        end

        def user_story
          @user_story = ::MyCw::UserStory.find params[:id]
          render status: 401 unless @user_story.user_id == @current_user[:user_id]
        end
      end
    end
  end
end
