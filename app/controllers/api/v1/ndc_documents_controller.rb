module Api
  module V1
    CountriesDocuments = Struct.new(:data, :laws_info, :laws_and_policies) do
      alias_method :read_attribute_for_serialization, :send
    end
    class NdcDocumentsController < ApiController
      LSE_API = 'https://climate-laws.org/cclow/api/targets'.freeze

      def index
        laws_info = SingleRecordFetcher.new(LSE_API, 'laws-info').call

        laws_and_policies = fetch_laws_and_policies if params[:locations].present?

        render json: CountriesDocuments.new(set_locations(params), laws_info, laws_and_policies),
               serializer: Api::V1::Indc::CountriesDocumentsSerializer
      end

      private

      def set_locations(params)
        locs = Location.order(:wri_standard_name)
        locs = locs.where(iso_code3: params[:locations].split(',')) if params[:locations].present?
        locs
      end

      def fetch_laws_and_policies
        laws_and_policies = {}
        laws_and_policies['targets'] = []
        params[:locations].split(',').each do |iso|
          iso = iso == 'EUU' ? 'EUR' : iso
          data = SingleRecordFetcher.new(LSE_API, iso, iso).call
          laws_and_policies['targets'] += data['targets']
        end
        laws_and_policies
      end
    end
  end
end
