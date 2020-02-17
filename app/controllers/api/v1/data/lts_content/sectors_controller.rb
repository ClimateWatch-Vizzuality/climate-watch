module Api
  module V1
    module Data
      module LtsContent
        class SectorsController < ApiController
          def index
            render json: ::Indc::Sector.all,
                   adapter: :json,
                   each_serializer: Api::V1::Data::NdcContent::SectorSerializer,
                   root: :data
          end
        end
      end
    end
  end
end
