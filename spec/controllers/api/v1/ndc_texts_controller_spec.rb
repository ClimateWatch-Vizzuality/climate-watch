require 'rails_helper'

RSpec.describe Api::V1::NdcTextsController, type: :controller do
  let!(:indc_document) {
    FactoryBot.create(:indc_document, slug: 'ndc')
  }
  let(:pol) {
    FactoryBot.create(:location, iso_code3: 'POL', location_type: 'COUNTRY')
  }
  let(:prt) {
    FactoryBot.create(:location, iso_code3: 'PRT', location_type: 'COUNTRY')
  }
  let(:pol_img_src) { 'POL-1.PNG' }
  let(:pol_html) {
    "<h1>Hello</h1>\n\n<p>\
<img src=\"#{S3_BUCKET_URL}/ndcs/#{pol_img_src}\" /></p><p>Lorem ipsum dolor\
sit amet, consectetur adipiscing elit. Nullam aliquam pretium risus laoreet.\
Cras sollicitudin eleifend maximus. Etiam nec nulla viverra, suscipit diam\
pulvinar, tempus augue. Hello sed egestas ipsum, et posuere tellus. \
Hello fermentum quam et nunc finibus, ac tincidunt urna mollis."
  }
  let(:pol_html_linkage_text) {
    'Nullam aliquam pretium risus laoreet.'
  }
  let(:pol_html_linkage_text_starts_at) {
    pol_html.index(pol_html_linkage_text)
  }
  let(:pol_html_linkage_text_ends_at) {
    pol_html.index(pol_html_linkage_text) + pol_html_linkage_text.length - 1
  }
  let(:pol_html_with_highlight) {
    pol_html.gsub(
      'Hello',
      "#{Ndc::PG_SEARCH_HIGHLIGHT_START}Hello#{Ndc::PG_SEARCH_HIGHLIGHT_END}"
    )
  }
  let(:prt_html) { 'foo bar baz' }
  let!(:pol_ndc) {
    FactoryBot.create(:ndc, location: pol, full_text: pol_html)
  }
  let!(:prt_ndc) {
    FactoryBot.create(:ndc, location: prt, full_text: prt_html)
  }
  let!(:pol_ndc_sdg_ndc_target) {
    FactoryBot.create(
      :ndc_sdg_ndc_target,
      ndc: pol_ndc,
      indc_text: pol_html_linkage_text,
      starts_at: pol_html_linkage_text_starts_at,
      ends_at: pol_html_linkage_text_ends_at
    )
  }
  let!(:pol_ndc_sdg_ndc_target_sector) {
    FactoryBot.create(
      :ndc_sdg_ndc_target_sector,
      ndc_target: pol_ndc_sdg_ndc_target
    )
  }

  before(:each) { Ndc.refresh_full_text_tsv }

  describe 'GET index' do
    it 'renders a list of NDCs' do
      get :index
      json_response = JSON.parse(response.body)
      ndcs = json_response['ndcs']
      expect(ndcs.length).to eq(2)
    end
    it 'renders a list of matching NDCS' do
      get :index, params: {query: 'hello'}
      json_response = JSON.parse(response.body)
      ndcs = json_response['ndcs']
      expect(ndcs.length).to eq(1)
    end
    it 'renders fragments with correct highlight indexes' do
      get :index, params: {query: 'hello'}
      json_response = JSON.parse(response.body)
      ndcs = json_response['ndcs']
      expect(ndcs.first['matches'].last['idx']).to equal(2)
    end
    it 'returns ndc and indc total document count as metadata' do
      get :index
      json_response = JSON.parse(response.body)
      meta = json_response['meta']
      expect(meta).to match('total_ndc_count' => 2, 'total_indc_count' => 0)
    end
  end

  describe 'GET show' do
    it 'renders NDC content in html' do
      get :show, params: {code: pol.iso_code3}
      json_response = JSON.parse(response.body)
      expect(json_response.first['html']).to match(pol_html)
    end
    it 'renders NDC content in html even if code downcased' do
      get :show, params: {code: pol.iso_code3.downcase}
      json_response = JSON.parse(response.body)
      expect(json_response.first['html']).to match(pol_html)
    end
    it 'responds with empty collection if bogus code' do
      get :show, params: {code: 'LOL'}
      json_response = JSON.parse(response.body)
      expect(json_response.length).to be(0)
    end
    it 'highlights matches' do
      get :show, params: {code: pol.iso_code3, query: 'hello'}
      json_response = JSON.parse(response.body)
      expect(json_response.first['html']).to match(pol_html_with_highlight)
    end
    it 'returns NDC content in html without highlights if no matches' do
      get :show, params: {code: pol.iso_code3.downcase, query: 'goodbye'}
      json_response = JSON.parse(response.body)
      expect(json_response.first['html']).to match(pol_html)
    end
    it 'returns NDC content with highlights when given a target number' do
      get :show, params: {
        code: pol.iso_code3.downcase,
        target: pol_ndc_sdg_ndc_target.target.number
      }
      json_response = JSON.parse(response.body)
      expect(json_response.first['linkages']).to match_array(
        [pol_html_linkage_text]
      )
      expect(json_response.first['html']).to include(
        "<span class=\"highlight\">#{pol_html_linkage_text}</span>"
      )
    end
    it 'returns NDC content with highlights when given a goal number' do
      get :show, params: {
        code: pol.iso_code3.downcase,
        goal: pol_ndc_sdg_ndc_target.target.goal.number
      }
      json_response = JSON.parse(response.body)
      expect(json_response.first['linkages']).to match_array(
        [pol_html_linkage_text]
      )
      expect(json_response.first['html']).to include(
        "<span class=\"highlight\">#{pol_html_linkage_text}</span>"
      )
    end
    it 'returns NDC content with highlights when given a sector id' do
      get :show, params: {
        code: pol.iso_code3.downcase,
        sector: pol_ndc_sdg_ndc_target_sector.sector.id
      }
      json_response = JSON.parse(response.body)
      expect(json_response.first['linkages']).to match_array(
        [pol_html_linkage_text]
      )
      expect(json_response.first['html']).to include(
        "<span class=\"highlight\">#{pol_html_linkage_text}</span>"
      )
    end
  end
end
