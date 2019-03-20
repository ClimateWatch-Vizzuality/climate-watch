require 'rails_helper'

RSpec.describe Api::V1::Data::AgricultureProfile::MeatProductionsController, type: :controller do
  context do
    let!(:some) {
      FactoryBot.create_list(:agriculture_profile_meat_production, 3)
    }
    describe 'GET index' do
      it 'renders data sources' do
        get :index
        expect(@response).to be_successful
        parsed_body = JSON.parse(response.body)
        expect(parsed_body['data'].length).to eq(3)
      end
    end
  end
end
