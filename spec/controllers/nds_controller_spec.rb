require 'rails_helper'

RSpec.describe NdcsController, type: :controller do
  describe 'GET show' do
    let(:poland) { FactoryGirl.create(:location, code: 'POL') }
    let(:poland_img_src) { 'POL-1.PNG' }
    let(:poland_md) {
      "# Hello\n ![](#{poland_img_src})"
    }
    let(:poland_html) {
      "<h1>Hello</h1>\n\n<p>\
<img src=\"#{S3_BUCKET_URL}/ndcs/#{poland_img_src}\" /></p>"
    }
    let!(:ndc_poland) {
      FactoryGirl.create(:ndc, location: poland, content: poland_md)
    }

    it 'renders NDC content in html' do
      get :show, params: {code: poland.code}
      expect(response.body).to match(poland_html)
    end
    it 'renders NDC content in html even if code downcased' do
      get :show, params: {code: poland.code.downcase}
      expect(response.body).to match(poland_html)
    end
  end
end
