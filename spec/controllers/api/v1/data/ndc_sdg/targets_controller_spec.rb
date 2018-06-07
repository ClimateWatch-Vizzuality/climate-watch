require 'rails_helper'

RSpec.describe Api::V1::Data::NdcSdg::TargetsController, type: :controller do
  include_context 'NDC SDG linkages'

  describe 'GET index' do
    it 'renders targets' do
      get :index
      expect(@response).to match_response_schema('ndc_sdg_targets')
    end
    it 'renders targets with sectors' do
      get :index, params: {include_sectors: true}
      expect(@response).to match_response_schema('ndc_sdg_targets_with_sectors')
    end
  end
end
