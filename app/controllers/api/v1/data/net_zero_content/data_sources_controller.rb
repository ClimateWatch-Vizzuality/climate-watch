module Api
  module V1
    module Data
      module NetZeroContent
        class DataSourcesController < Api::V1::Data::NdcContent::DataSourcesController
          private

          def data_sources
            ::Indc::Source.net_zero
          end
        end
      end
    end
  end
end
