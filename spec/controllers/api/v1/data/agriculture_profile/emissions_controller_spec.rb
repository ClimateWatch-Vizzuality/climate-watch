require 'rails_helper'

RSpec.describe Api::V1::Data::AgricultureProfile::EmissionsController, type: :controller do
  include_context 'historical emissions records'

  describe 'GET index' do
    it 'renders data sources' do
      get :index
      expect(@response).to match_response_schema('historical_emissions_data_sources')
    end
  end
end
