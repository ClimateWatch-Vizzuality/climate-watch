module Api
  module V1
    module Data
      module LtsContent
        class SectorsController < Api::V1::Data::NdcContent::SectorsController
          private

          def source
            ::Indc::Source.lts
          end
        end
      end
    end
  end
end
