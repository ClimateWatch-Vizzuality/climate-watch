require 'rails_helper'

describe Api::V1::HistoricalEmissionsController, type: :controller do
  context do
    let!(:some_historical_emissions_records) {
      FactoryGirl.create_list(:historical_emissions_record, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'lists all historical emission records' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
      end
    end
  end
end
