require 'rails_helper'

describe Api::V1::SocioeconomicsController, type: :controller do
  context do
    let!(:polish_socioeconomics) {
      location = FactoryGirl.create(:location, iso_code3: 'POL')
      FactoryGirl.create_list(:socioeconomic_indicator, 2, location: location)
    }
    let!(:other_socioeconomics) {
      FactoryGirl.create_list(:socioeconomic_indicator, 2)
    }

    describe 'GET index' do
      it 'filters socioeconomic values by location' do
        get :index, params: {location: 'POL'}
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(2)
      end
    end
  end
end
