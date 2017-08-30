require 'rails_helper'

RSpec.describe Api::V1::NdcFullTextsController, type: :controller do
  let(:pol) {
    FactoryGirl.create(:location, iso_code3: 'POL', location_type: 'COUNTRY')
  }
  let(:pol_img_src) { 'POL-1.PNG' }
  let(:pol_html) {
    "<h1>Hello</h1>\n\n<p>\
<img src=\"#{S3_BUCKET_URL}/ndcs/#{pol_img_src}\" /></p>"
  }
  let!(:pol_ndc) {
    FactoryGirl.create(:ndc, location: pol, full_text: pol_html)
  }

  describe 'GET index' do
    it 'renders a list of NDCs' do
      get :index
      expect(assigns(:ndcs)).to match_array([pol_ndc])
    end
  end

  describe 'GET show' do
    it 'renders NDC content in html' do
      get :show, params: {code: pol.iso_code3}
      expect(response.body).to match(pol_html)
    end
    it 'renders NDC content in html even if code downcased' do
      get :show, params: {code: pol.iso_code3.downcase}
      expect(response.body).to match(pol_html)
    end
    it 'responds with 404 if bogus code' do
      get :show, params: {code: 'LOL'}
      expect(response.status).to be(404)
    end
  end
end
