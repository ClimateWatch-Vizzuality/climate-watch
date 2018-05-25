module Api
  module V1
    module Data
      module NdcSdg
        class SectorsController < Api::V1::Data::ApiController
          def index
            render json: ::NdcSdg::Sector.all,
                   each_serializer: Api::V1::Data::NdcSdg::SectorSerializer
          end
        end
      end
    end
  end
end
