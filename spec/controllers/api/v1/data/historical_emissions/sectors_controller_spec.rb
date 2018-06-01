require 'rails_helper'

RSpec.describe Api::V1::Data::HistoricalEmissions::SectorsController, type: :controller do
  include_context 'historical emissions records'

  describe 'GET index' do
    it 'renders sectors' do
      get :index
      expect(@response).to match_response_schema('historical_emissions_sectors')
    end
  end
end
