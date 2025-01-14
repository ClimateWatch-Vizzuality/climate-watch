require 'rails_helper'

RSpec.describe Api::V1::Data::NdcContent::GlobalEmissionsController, type: :controller do
  describe 'GET index' do
    before do
      FactoryBot.create :indc_global_emissions, year: 2020
      FactoryBot.create :indc_global_emissions,
                        year: 2021,
                        historical_emissions: 100,
                        ndcs_conditional_2020: 200
    end

    it 'returns indc global emissions' do
      get :index
      expect(response).to match_response_schema('ndc_content_global_emissions')
    end
  end
end
