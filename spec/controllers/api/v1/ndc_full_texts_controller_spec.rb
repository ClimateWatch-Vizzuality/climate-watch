require 'rails_helper'

RSpec.describe Api::V1::NdcFullTextsController, type: :controller do
  let(:pol) {
    FactoryGirl.create(:location, iso_code3: 'POL', location_type: 'COUNTRY')
  }
  let(:prt) {
    FactoryGirl.create(:location, iso_code3: 'PRT', location_type: 'COUNTRY')
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
  let(:pol_html_with_highlight) {
    pol_html.gsub(
      'Hello',
      "#{Ndc::PG_SEARCH_HIGHLIGHT_START}Hello#{Ndc::PG_SEARCH_HIGHLIGHT_END}"
    )
  }
  let(:prt_html) { 'foo bar baz' }
  let!(:pol_ndc) {
    FactoryGirl.create(:ndc, location: pol, full_text: pol_html)
  }
  let!(:prt_ndc) {
    FactoryGirl.create(:ndc, location: prt, full_text: prt_html)
  }

  before(:each) { Ndc.refresh_full_text_tsv }

  describe 'GET index' do
    it 'renders a list of NDCs' do
      get :index
      expect(assigns(:ndcs)).to match_array([pol_ndc, prt_ndc])
    end
    it 'renders a list of matching NDCS' do
      get :index, params: {query: 'hello'}
      expect(assigns(:ndcs)).to match_array([pol_ndc])
    end
    it 'renders fragments with correct highlight indexes' do
      get :index, params: {query: 'hello'}
      json_response = JSON.parse(response.body)
      expect(json_response.first['matches'].last['idx']).to equal(2)
    end
  end

  describe 'GET show' do
    it 'renders NDC content in html' do
      get :show, params: {code: pol.iso_code3}
      json_response = JSON.parse(response.body)
      expect(json_response['html']).to match(pol_html)
    end
    it 'renders NDC content in html even if code downcased' do
      get :show, params: {code: pol.iso_code3.downcase}
      json_response = JSON.parse(response.body)
      expect(json_response['html']).to match(pol_html)
    end
    it 'responds with 404 if bogus code' do
      get :show, params: {code: 'LOL'}
      expect(response.status).to be(404)
    end
    it 'highlights matches' do
      get :show, params: {code: pol.iso_code3, query: 'hello'}
      json_response = JSON.parse(response.body)
      expect(json_response['html']).to match(pol_html_with_highlight)
    end
    it 'returns NDC content in html without highlights if no matches' do
      get :show, params: {code: pol.iso_code3.downcase, query: 'goodbye'}
      json_response = JSON.parse(response.body)
      expect(json_response['html']).to match(pol_html)
    end
  end
end
