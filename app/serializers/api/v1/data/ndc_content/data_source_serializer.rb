module Api
  module V1
    module Data
      module NdcContent
        class DataSourceSerializer < ActiveModel::Serializer
          attributes :id, :name
        end
      end
    end
  end
end
