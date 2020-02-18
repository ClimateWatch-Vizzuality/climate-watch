module Api
  module V1
    module Data
      module NdcContent
        class SectorsController < ApiController
          def index
            sectors = ::Indc::Sector.joins(values: :indicator).
              where(indc_indicators: {source_id: source}).distinct.
              order(:name)

            render json: sectors,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::SectorSerializer,
                   root: :data
          end

          private

          def source
            ::Indc::Source.non_lts
          end
        end
      end
    end
  end
end
