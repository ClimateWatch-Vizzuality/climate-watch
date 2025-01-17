require 'rails_helper'

RSpec.describe Api::V1::Data::NdcContent::CountryEmissionsController, type: :controller do
  describe 'GET index' do
    before do
      FactoryBot.create :indc_country_emission
      FactoryBot.create :indc_country_emission,
                        baseline1990_2030_uc: nil,
                        baseline2005_2035_uc: 200
    end

    it 'returns indc country emissions' do
      get :index
      expect(response).to match_response_schema('ndc_content_country_emissions')
    end
  end
end
