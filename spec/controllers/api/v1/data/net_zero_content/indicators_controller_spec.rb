require 'rails_helper'

RSpec.describe Api::V1::Data::NetZeroContent::IndicatorsController, type: :controller do
  include_context 'Net Zero indicators'

  describe 'GET index' do
    it 'renders indicators' do
      get :index
      expect(@response).to match_response_schema('ndc_content_indicators')
    end
  end
end
