module Api
  module V1
    module Data
      module NdcContent
        class DocumentSerializer < ActiveModel::Serializer
          attributes :id, :ordering, :slug, :long_name, :description
        end
      end
    end
  end
end
