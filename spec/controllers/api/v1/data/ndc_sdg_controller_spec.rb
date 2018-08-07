require 'rails_helper'

RSpec.describe Api::V1::Data::NdcSdgController, type: :controller do
  include_context 'NDC SDG linkages'

  describe 'GET index' do
    it 'renders NDC SDG linkages' do
      get :index, params: {
        countries: [spain.iso_code3],
        goal_ids: [goal_1.id],
        target_ids: [target_1_1.id],
        sector_ids: [sector_1.id]
      }
      expect(@response).to match_response_schema('ndc_sdgs')
    end

    it 'sorts by iso_code3 ascending' do
      get :index, params: {
        sort_col: 'iso_code3', sort_dir: 'ASC'
      }
      records = JSON.parse(@response.body)['data']
      expect(records.first['iso_code3']).to eq(spain.iso_code3)
    end

    it 'sorts by iso_code3 descending' do
      get :index, params: {
        sort_col: 'iso_code3', sort_dir: 'DESC'
      }
      records = JSON.parse(@response.body)['data']
      expect(records.first['iso_code3']).to eq(uk.iso_code3)
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
        to eq('attachment; filename="ndc_sdg.csv"')
    end
  end

  describe 'HEAD meta' do
    it 'returns a header link with path to goals' do
      head :meta
      links = response.headers['Link'].split(',')
      data_sources_link = links.find do |l|
        _path, rel = l.split(';')
        rel =~ /meta goals/
      end
      expect(data_sources_link).to be_present
    end
  end
end
