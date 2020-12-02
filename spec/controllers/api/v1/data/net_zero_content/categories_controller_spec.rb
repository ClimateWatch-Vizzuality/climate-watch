require 'rails_helper'

RSpec.describe Api::V1::Data::NetZeroContent::CategoriesController, type: :controller do
  include_context 'Net Zero categories'

  describe 'GET index' do
    it 'renders categories' do
      get :index
      expect(@response).to match_response_schema('ndc_content_categories')
    end
  end
end
