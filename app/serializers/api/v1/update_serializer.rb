module Api
  module V1
    class UpdateSerializer < ActiveModel::Serializer
      attribute :category
      attribute :link
      attribute :description
      attribute :updated_at, key: :date
    end
  end
end
