require 'rails_helper'

RSpec.describe Api::V1::Data::NdcSdg::GoalsController, type: :controller do
  include_context 'NDC SDG linkages'

  describe 'GET index' do
    it 'renders goals' do
      get :index
      expect(@response).to match_response_schema('ndc_sdg_goals')
    end
    it 'renders goals with targets' do
      get :index, params: {include_targets: true}
      expect(@response).to match_response_schema('ndc_sdg_goals_with_targets')
    end
    it 'renders goals with targets and sectors' do
      get :index, params: {include_sectors: true}
      expect(@response).to match_response_schema('ndc_sdg_goals_with_targets_and_sectors')
    end
  end
end
