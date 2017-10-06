require 'rails_helper'

describe Api::V1::HistoricalEmissionsController, type: :controller do
  context do
    let!(:some_historical_emissions_records) {
      data_source = FactoryGirl.create(:historical_emissions_data_source)
      sector = FactoryGirl.create(:historical_emissions_sector,
                                  data_source: data_source)
      gas = FactoryGirl.create(:historical_emissions_gas)
      gwp = FactoryGirl.create(:historical_emissions_gwp)
      FactoryGirl.create_list(
        :historical_emissions_record,
        3,
        data_source: data_source,
        sector: sector,
        gas: gas,
        gwp: gwp
      )
    }

    describe 'GET meta' do
      it 'returns endpoint metadata' do
        get :meta
        expect(response).to be_success
      end
    end

    describe 'GET index' do
      it 'query without filter parameters returns 400 response' do
        get :index
        expect(response).to have_http_status(:bad_request)
      end

      it 'lists all historical emission records' do
        params = {
          source: ::HistoricalEmissions::DataSource.first.id,
          gas: ::HistoricalEmissions::Gas.first.id
        }
        get :index, params: params
        parsed_body = JSON.parse(response.body)
        expect(response).to be_success
        expect(parsed_body.length).to eq(3)
      end
    end
  end
end
