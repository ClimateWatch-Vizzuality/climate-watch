require 'rails_helper'

describe Api::V1::SocioeconomicsController, type: :controller do
  context do
    let(:location) {
      FactoryBot.create(:location, iso_code3: 'POL')
    }

    let!(:polish_socioeconomics) {
      FactoryBot.create_list(:socioeconomic_indicator, 2, location: location)
    }
    let!(:other_socioeconomics) {
      FactoryBot.create_list(:socioeconomic_indicator, 2)
    }

    describe 'GET index' do
      it 'filters socioeconomic values by location' do
        get :index, params: {location_code: location.iso_code3}
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(2)
      end
    end
  end
end
