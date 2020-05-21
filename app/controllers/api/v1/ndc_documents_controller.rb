module Api
  module V1
    CountriesDocuments = Struct.new(:data, :laws_info) do
      alias_method :read_attribute_for_serialization, :send
    end
    class NdcDocumentsController < ApiController
      LSE_API = 'https://climate-laws.org/cclow/api/targets'.freeze

      def index
        laws_info = SingleRecordFetcher.new(LSE_API, 'laws-info').call

        render json: CountriesDocuments.new(set_locations(params), laws_info),
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
