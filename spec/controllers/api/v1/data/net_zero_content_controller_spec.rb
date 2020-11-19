require 'rails_helper'

RSpec.describe Api::V1::Data::NetZeroContentController, type: :controller do
  include_context 'Net Zero values'

  before(:each) do
    Indc::SearchableValue.refresh
  end

  describe 'GET index' do
    it 'renders Net Zero values' do
      get :index, params: {
        countries: [spain.iso_code3],
        source_ids: [net_zero.id],
        indicator_ids: [nz_ghg.id],
        category_ids: [overview.id],
        label_ids: [ghg_coverage_label.id]
      }
      expect(@response).to match_response_schema('ndc_content')
    end

    it 'sorts by indicator ascending' do
      get :index, params: {
        sort_col: 'indicator_name', sort_dir: 'ASC'
      }
      records = JSON.parse(@response.body)['data']
      expect(records.first['indicator_name']).to eq(nz_ghg.name)
    end

    it 'sorts by indicator descending' do
      get :index, params: {
        sort_col: 'indicator_name', sort_dir: 'DESC'
      }
      records = JSON.parse(@response.body)['data']
      expect(records.first['indicator_name']).to eq(nz_status.name)
    end

    it 'sets pagination headers' do
      get :index
      expect(@response.headers).to include('Total')
    end
  end

  describe 'GET download' do
    it 'returns data as csv' do
      get :download
      expect(response.content_type).to eq('application/zip')
      expect(response.headers['Content-Disposition']).
        to eq('attachment; filename="net_zero_content.zip"')
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
