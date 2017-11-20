module Api
  module V1
    module MyCw
      class UserStorySerializer < ActiveModel::Serializer
        attributes :id, :title, :body, :public, :created_at, :updated_at
      end
    end
  end
end