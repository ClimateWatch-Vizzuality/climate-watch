require 'rails_helper'

describe Api::V1::NdcsController, type: :controller do
  context do
    let!(:some_cait_indc_values) {
      FactoryGirl.create_list(:cait_indc_indicator, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'lists all cait indc indicators' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
      end
    end
  end
end
