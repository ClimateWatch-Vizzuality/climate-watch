require 'rails_helper'

describe Api::V1::StoriesController, type: :controller do
  context do
    let!(:some_stories) {
      FactoryBot.create_list(:story, 7)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'lists six stories' do
        get :index, params: {limit: 6}
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(6)
      end
    end
  end
end
