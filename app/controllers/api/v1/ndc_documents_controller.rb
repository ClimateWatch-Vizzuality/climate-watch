module Api
  module V1
    CountriesDocuments = Struct.new(:data) do
      alias_method :read_attribute_for_serialization, :send
    end
    class NdcDocumentsController < ApiController
      def index
        render json: CountriesDocuments.new(set_locations(params)),
               serializer: Api::V1::Indc::CountriesDocumentsSerializer
      end

      private

      def set_locations(params)
        locs = Location.order(:wri_standard_name)

        if params[:location]
          locs = locs.where(iso_code3: params[:location])
        end

        locs
      end
    end
  end
end
