require 'rails_helper'

describe Api::V1::NdcsController, type: :controller do
  context do
    let!(:some_cait_indc_values) {
      list = FactoryGirl.create_list(:cait_indc_indicator_with_dependants, 3)
      MaterializedView.refresh(
        'indc_categories',
        'indc_indicators',
        'indc_indicators_categories',
        'indc_labels',
        'indc_sectors',
        'indc_values'
      )
      list
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'lists all cait indc indicators' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body['indicators'].length).to eq(3)
      end
    end
  end
end
