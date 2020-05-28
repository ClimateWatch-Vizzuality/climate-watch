module Api
  module V1
    module Data
      module HistoricalEmissions
        class GasSerializer < ActiveModel::Serializer
          attributes :id, :name, :slug

          def slug
            object.name.parameterize
          end
        end
      end
    end
  end
end
