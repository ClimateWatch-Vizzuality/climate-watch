require 'rails_helper'

RSpec.describe Api::V1::Data::HistoricalEmissionsController, type: :controller do
  include_context 'historical emissions records'

  before(:each) do
    HistoricalEmissions::NormalisedRecord.refresh
    HistoricalEmissions::SearchableRecord.refresh
  end

  describe 'GET index' do
    it 'renders emissions records' do
      get :index, params: {
        regions: [spain.iso_code3],
        source_ids: [source_CAIT.id],
        gwp_ids: [gwp_AR2.id],
        gas_ids: [gas_CO2.id],
        sector_ids: [sector_energy.id],
        start_year: 1991
      }
      expect(@response).to match_response_schema('historical_emissions')
    end

    it 'sorts by gas ascending' do
      get :index, params: {
        sort_col: 'gas', sort_dir: 'ASC'
      }
      records = JSON.parse(@response.body)['data']
      expect(records.first['gas']).to eq(gas_CO2.name)
    end

    it 'sorts by gas descending' do
      get :index, params: {
        sort_col: 'gas', sort_dir: 'DESC'
      }
      records = JSON.parse(@response.body)['data']
      expect(records.first['gas']).to eq(gas_N2O.name)
    end

    it 'sets pagination headers' do
      get :index
      expect(@response.headers).to include('Total')
    end
  end

  describe 'GET download' do
    it 'returns data as csv' do
      get :download
      expect(response.content_type).to eq('text/csv')
      expect(response.headers['Content-Disposition']).
        to eq('attachment; filename="historical_emissions.csv"')
    end

    it 'replaces nulls with N/A' do
      require 'csv'
      get :download, params: {
        regions: [uk.iso_code3],
        source_ids: [source_PIK.id],
        gwp_ids: [gwp_AR4.id],
        gas_ids: [gas_N2O.id],
        sector_ids: [sector_agriculture.id],
        start_year: 1992
      }
      parsed_csv = CSV.parse(response.body)
      expect(parsed_csv.last.last).to eq('N/A')
    end
  end

  describe 'HEAD meta' do
    it 'returns a header link with path to data sources' do
      head :meta
      links = response.headers['Link'].split(',')
      data_sources_link = links.find do |l|
        _path, rel = l.split(';')
        rel =~ /meta data_sources/
      end
      expect(data_sources_link).to be_present
    end
  end
end
