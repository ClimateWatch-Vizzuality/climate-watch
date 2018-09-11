require 'rails_helper'
require 'controllers/api/v1/my_cw/helpers'
include Helpers

describe Api::V1::MyCw::VisualizationsController, type: :controller do
  before(:each) do
    set_cookies
  end

  context do
    let!(:user) {
      FactoryBot.create(:user)
    }
    let!(:some_visualization) {
      FactoryBot.create_list(:visualization, 3, user: user)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        VCR.use_cassette('user_token') do
          get :index
          expect(response).to be_successful
        end
      end

      it 'lists all known user stories' do
        VCR.use_cassette('user_token') do
          get :index
          parsed_body = JSON.parse(response.body)
          expect(parsed_body.length).to eq(3)
        end
      end
    end
  end
end
