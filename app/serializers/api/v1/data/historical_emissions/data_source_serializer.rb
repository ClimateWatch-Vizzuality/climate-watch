module Api
  module V1
    module Data
      module HistoricalEmissions
        class DataSourceSerializer < ActiveModel::Serializer
          attributes :id, :name, :display_name
        end
      end
    end
  end
end
