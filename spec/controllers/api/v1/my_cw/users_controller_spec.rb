require 'rails_helper'
require 'controllers/api/v1/my_cw/helpers'
include Helpers

describe Api::V1::MyCw::UsersController, type: :controller do
  before(:each) do
    set_cookies
  end

  context do
    let!(:user) {
      FactoryBot.create(:user)
    }

    describe 'GET show' do
      it 'returns a successful 200 response' do
        VCR.use_cassette('user_token') do
          get :current
          expect(response).to be_successful
        end
      end
    end

    describe 'POST create' do
      it 'returns a successful 200 response' do
        VCR.use_cassette('user_token') do
          post :create, params: {user: {ct_id: 'AAAA'}}
          expect(response).to be_successful
        end
      end
    end
  end
end
