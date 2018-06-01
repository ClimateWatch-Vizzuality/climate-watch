require 'rails_helper'

RSpec.describe Api::V1::Data::HistoricalEmissions::GwpsController, type: :controller do
  include_context 'historical emissions records'

  describe 'GET index' do
    it 'renders gwps' do
      get :index
      expect(@response).to match_response_schema('historical_emissions_gwps')
    end
  end
end
