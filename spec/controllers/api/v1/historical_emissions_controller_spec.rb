require 'rails_helper'

describe Api::V1::HistoricalEmissionsController, type: :controller do

  context do
    let(:location) { FactoryGirl.create(:location) }
    let(:data_source) { FactoryGirl.create(:historical_emissions_data_source) }
    let(:gas) { FactoryGirl.create(:historical_emissions_gas) }
    let(:gwp2) { FactoryGirl.create(:historical_emissions_gwp, name: 'AR2') }
    let(:gwp4) { FactoryGirl.create(:historical_emissions_gwp, name: 'AR4') }
    let(:sector) do
      FactoryGirl.create(
        :historical_emissions_sector,
        data_source: data_source
      )
    end

    let!(:some_historical_emissions_records) {
      [
        FactoryGirl.create(
          :historical_emissions_record,
          data_source: data_source,
          sector: sector,
          gas: gas,
          gwp: gwp2,
          location: location
        ),
        FactoryGirl.create(
          :historical_emissions_record,
          data_source: data_source,
          sector: sector,
          gas: gas,
          gwp: gwp4,
          location: location
        )
      ]
    }

    let(:data_source2) { FactoryGirl.create(:historical_emissions_data_source) }
    let!(:record_with_just_ar2) {
      FactoryGirl.create(
        :historical_emissions_record,
        data_source: data_source2,
        sector: sector,
        gas: gas,
        gwp: gwp2,
        location: location
      )
    }

    it 'when filtering by location, source, and gas, return 2 records' do
      get(
        :index,
        params: {
          source: data_source.id,
          gas: gas.id,
          location: location.iso_code3
        }
      )
      parsed_body = JSON.parse(response.body)
      expect(response).to be_success
      expect(parsed_body.length).to eq(2)
    end

    it 'returns results for the correct gwp' do
      get(
        :index,
        params: {
          source: data_source.id,
          gas: gas.id,
          location: location.iso_code3,
          gwp: gwp2.id
        }
      )
      parsed_body = JSON.parse(response.body)
      expect(response).to be_success
      expect(parsed_body.length).to eq(1)
      expect(parsed_body.first['gwp']).to eq('AR2')
    end

    it 'returns the AR2 record when no AR4 is present' do
      get(
        :index,
        params: {
          source: data_source2.id,
          gas: gas.id,
          location: location.iso_code3
        }
      )
      parsed_body = JSON.parse(response.body)
      expect(response).to be_success
      expect(parsed_body.length).to eq(1)
      expect(parsed_body.first['gwp']).to eq('AR2')
    end
  end

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
