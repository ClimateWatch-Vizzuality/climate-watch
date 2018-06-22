require 'rails_helper'

RSpec.describe Api::V1::Data::NdcSdg::SectorsController, type: :controller do
  include_context 'NDC SDG sectors'

  describe 'GET index' do
    it 'renders sectors' do
      get :index
      expect(@response).to match_response_schema('ndc_sdg_sectors')
    end
  end
end
