require 'rails_helper'

describe Api::V1::Locations::CountriesController, type: :controller do
  context do
    let!(:some_locations) {
      FactoryBot.create_list(:location_country, 3, :with_states)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_successful
      end

      it 'lists all known locations that are countries' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
        parsed_body.each do |region|
          expect(region['members']).to be_nil
        end
      end

      it 'returns members if needed' do
        get :index, params: {members: true}
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
        parsed_body.each do |region|
          expect(region['members'].length).to eq(3)
        end
      end
    end
  end
end
