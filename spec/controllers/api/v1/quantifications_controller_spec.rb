require 'rails_helper'

describe Api::V1::QuantificationsController, type: :controller do
  context do
    let!(:polish_quantifications) {
      location = FactoryGirl.create(:location, iso_code3: 'POL')
      FactoryGirl.create_list(:quantification_value, 2, location: location)
    }
    let!(:german_quantifications) {
      location = FactoryGirl.create(:location, iso_code3: 'GER')
      FactoryGirl.create_list(:quantification_value, 3, location: location)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'lists all quantification values' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(5)
      end

      it 'filters quantification values by location' do
        get :index, params: {location: 'POL'}
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(2)
      end
    end
  end
end
