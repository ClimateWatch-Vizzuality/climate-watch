module Api
  module V1
    module Data
      module NdcContent
        class LabelSerializer < ActiveModel::Serializer
          attributes :id, :indicator_id, :value
        end
      end
    end
  end
end
