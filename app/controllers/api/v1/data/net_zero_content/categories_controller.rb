module Api
  module V1
    module Data
      module NetZeroContent
        class CategoriesController < Api::V1::Data::NdcContent::CategoriesController
          private

          def source
            ::Indc::Source.net_zero.pluck(:id)
          end
        end
      end
    end
  end
end
