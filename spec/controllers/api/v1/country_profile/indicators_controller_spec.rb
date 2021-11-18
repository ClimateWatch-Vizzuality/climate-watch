require 'rails_helper'

describe Api::V1::CountryProfile::IndicatorsController, type: :controller do
  let_it_be(:indicators) {
    create_list(:country_profile_indicator, 3, :with_values, location: create(:location))
  }

  describe 'GET index' do
    it 'returns a successful 200 response' do
      get :index
      expect(response).to be_successful
    end

    it 'lists all indicators' do
      get :index
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['data'].length).to eq(3)
    end
  end
end
