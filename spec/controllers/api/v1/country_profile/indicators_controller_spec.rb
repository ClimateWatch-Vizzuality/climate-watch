require 'rails_helper'

describe Api::V1::CountryProfile::IndicatorsController, type: :controller do
  let_it_be(:indicators) {
    create_list(:country_profile_indicator, 3, :with_values, location: create(:location))
    create(
      :country_profile_indicator,
      slug: 'some_rank',
      values: [
        build(:country_profile_value, value: '2'),
        build(:country_profile_value, value: '4'),
        build(:country_profile_value, value: '1')
      ]
    )
  }

  describe 'GET index' do
    it 'returns a successful 200 response' do
      get :index
      expect(response).to be_successful
    end

    it 'lists all indicators' do
      get :index
      expect(response.body).to match_snapshot('api/v1/country_profile/indicators')
    end
  end
end
