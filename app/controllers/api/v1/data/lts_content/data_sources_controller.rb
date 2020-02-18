module Api
  module V1
    module Data
      module LtsContent
        class DataSourcesController < Api::V1::Data::NdcContent::DataSourcesController
          private

          def data_sources
            ::Indc::Source.lts
          end
        end
      end
    end
  end
end
