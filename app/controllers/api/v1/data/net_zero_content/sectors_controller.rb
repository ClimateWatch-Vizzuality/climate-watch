module Api
  module V1
    module Data
      module NetZeroContent
        class SectorsController < Api::V1::Data::NdcContent::SectorsController
          private

          def source
            ::Indc::Source.net_zero
          end
        end
      end
    end
  end
end
