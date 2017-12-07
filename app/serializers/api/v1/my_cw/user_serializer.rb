module Api
  module V1
    module MyCw
      class UserSerializer < ActiveModel::Serializer
        attribute :id
        attribute :ct_id
      end
    end
  end
end
