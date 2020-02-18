module Api
  module V1
    module Data
      module LtsContent
        class CategoriesController < Api::V1::Data::NdcContent::CategoriesController
          private

          def source
            ::Indc::Source.non_lts.pluck(:id)
          end
        end
      end
    end
  end
end
