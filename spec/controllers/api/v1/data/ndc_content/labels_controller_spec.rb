require 'rails_helper'

RSpec.describe Api::V1::Data::NdcContent::LabelsController, type: :controller do
  include_context 'NDC labels'

  describe 'GET index' do
    it 'renders labels' do
      get :index
      expect(@response).to match_response_schema('ndc_content_labels')
    end
  end
end
