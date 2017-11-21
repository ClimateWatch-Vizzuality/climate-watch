module Api
  module V1
    module MyCw
      class VizualizationSerializer < ActiveModel::Serializer
        attributes :id, :title, :description, :json_body, :created_at, :updated_at
      end
    end
  end
end
