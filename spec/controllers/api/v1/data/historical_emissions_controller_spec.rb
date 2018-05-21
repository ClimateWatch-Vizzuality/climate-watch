require 'rails_helper'

RSpec.describe Api::V1::Data::HistoricalEmissionsController, type: :controller do
  include_context 'historical emissions records'

  describe 'GET index' do
    it 'renders emissions records' do
      get :index, params: {
        source_ids: [source_CAIT.id],
        gwp_ids: [gwp_AR2.id],
        gas_ids: [gas_CO2.id],
        sector_ids: [sector_energy.id],
        start_year: 1991
      }
      expect(@response).to match_response_schema('historical_emissions')
    end

    it 'sets pagination headers' do
      get :index
      expect(@response.headers).to include('Total')
    end
  end

  describe 'GET download' do
    it 'returns data as csv' do
      get :download
      expect(response.content_type).to eq('text/csv')
      expect(response.headers['Content-Disposition']).
        to eq('attachment; filename=historical_emissions.csv')
    end
  end
end
