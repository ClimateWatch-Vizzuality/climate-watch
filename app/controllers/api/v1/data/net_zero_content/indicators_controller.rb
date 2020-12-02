module Api
  module V1
    module Data
      module NetZeroContent
        class IndicatorsController < Api::V1::Data::NdcContent::IndicatorsController
          private

          def source
            ::Indc::Source.net_zero.pluck(:id)
          end

          def link_prefix
            '/api/v1/data/net_zero_content/data_sources'
          end
        end
      end
    end
  end
end
