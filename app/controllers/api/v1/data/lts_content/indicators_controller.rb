module Api
  module V1
    module Data
      module LtsContent
        class IndicatorsController < Api::V1::Data::NdcContent::IndicatorsController
          private

          def source
            ::Indc::Source.lts.pluck(:id)
          end

          def link_prefix
            '/api/v1/data/lts_content/data_sources'
          end
        end
      end
    end
  end
end
