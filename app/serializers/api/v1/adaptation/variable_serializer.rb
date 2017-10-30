module Api
  module V1
    module Adaptation
      class VariableSerializer < ActiveModel::Serializer
        attribute :slug
        attribute :name
        attribute :maximum
        has_many :values, serializer: Adaptation::ValueSerializer do
          object.values.reject do |v|
            v.value.nil?
          end
        end
      end
    end
  end
end
