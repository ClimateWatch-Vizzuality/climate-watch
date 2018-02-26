require 'rails_helper'

describe Api::V1::AdaptationsController, type: :controller do
  context do
    let!(:some_adaptations) {
      FactoryBot.create_list(:adaptation_variable, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'lists all adaptation variables' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
      end
    end
  end
end
