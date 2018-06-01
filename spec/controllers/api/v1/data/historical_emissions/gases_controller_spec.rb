require 'rails_helper'

RSpec.describe Api::V1::Data::HistoricalEmissions::GasesController, type: :controller do
  include_context 'historical emissions records'

  describe 'GET index' do
    it 'renders gases' do
      get :index
      expect(@response).to match_response_schema('historical_emissions_gases')
    end
  end
end
