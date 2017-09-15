module Api
  module V1
    module Adaptation
      class VariableSerializer < ActiveModel::Serializer
        attribute :slug
        attribute :name
        has_many :values, serializer: Adaptation::ValueSerializer
      end
    end
  end
end
