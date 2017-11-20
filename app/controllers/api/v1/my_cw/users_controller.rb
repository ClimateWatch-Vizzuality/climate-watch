module Api
  module V1
    module MyCw
      class UsersController < MyCwController

        # Gets the current user
        def current_user
          current_user = session[:current_user]
          user = User.find current_user.id
          render json: user, serializer: Api::V1::MyCw::UserSerializer
        end
      end
    end
  end
end
