require 'rails_helper'

RSpec.describe Api::V1::Data::NdcContent::SectorsController, type: :controller do
  include_context 'NDC sectors'

  describe 'GET index' do
    it 'renders sectors' do
      get :index
      expect(@response).to match_response_schema('ndc_content_sectors')
    end
  end
end
