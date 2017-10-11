module Api
  module V1
    NdcSdgsMetadata = Struct.new(:sectors, :targets) do
      alias_method :read_attribute_for_serialization, :send
    end

    class NdcSdgsController < ApiController
      def index
        sectors = ::NdcSdg::Sector.all
        targets = ::NdcSdg::Target.
          includes(:sectors).
          references(:sectors)

        render json: NdcSdgsMetadata.new(sectors, targets),
               serializer: Api::V1::NdcSdg::MetaSerializer
      end

      def show
        @ndc = Ndc.joins(:location).where(
          'locations.iso_code3' => params[:code].upcase
        ).first
        unless @ndc
          render json: {
            error: 'NDC not found',
            status: 404
          }, status: :not_found and return
        end
        render json: @ndc,
               serializer: Api::V1::NdcSdg::NdcSerializer
      end
    end
  end
end
