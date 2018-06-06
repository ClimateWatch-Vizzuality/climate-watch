require 'rails_helper'

RSpec.describe Api::V1::Data::NdcContentController, type: :controller do
  include_context 'NDC values'

  describe 'GET index' do
    it 'renders NDC values' do
      get :index, params: {
        countries: [spain.iso_code3],
        indicator_ids: [ghg_target_type.id],
        category_ids: [overview.id],
        label_ids: [baseline_scenario_target.id]
      }
      expect(@response).to match_response_schema('ndc_content')
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
        to eq('attachment; filename=ndc_content.csv')
    end
  end

  describe 'HEAD meta' do
    it 'returns a header link with path to categories' do
      head :meta
      links = response.headers['Link'].split(',')
      categories_link = links.find do |l|
        _path, rel = l.split(';')
        rel =~ /meta categories/
      end
      expect(categories_link).to be_present
    end
  end
end
