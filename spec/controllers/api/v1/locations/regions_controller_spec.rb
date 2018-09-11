require 'rails_helper'

describe Api::V1::Locations::RegionsController, type: :controller do
  context do
    let!(:some_locations) {
      FactoryBot.create_list(:location_region, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_successful
      end

      it 'lists all known locations that are regions' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
        parsed_body.each do |region|
          expect(region['members'].length).to eq(3)
        end
      end
    end
  end
end
