require 'rails_helper'

describe Api::V1::KeyVisualizationsController, type: :controller do
  context do
    let!(:key_visualizations) {
      FactoryBot.create_list(:key_visualization, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_successful
      end

      it 'lists all key visualizations' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body['data'].length).to eq(3)
      end
    end
  end
end
