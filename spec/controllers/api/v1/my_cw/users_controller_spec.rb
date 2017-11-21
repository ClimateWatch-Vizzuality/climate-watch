require 'rails_helper'

describe Api::V1::MyCw::UsersController, type: :controller do
  context do
    let!(:user) {
      FactoryGirl.create(:user)
    }

    describe 'GET show' do
      it 'returns a successful 200 response' do
        get :current
        expect(response).to be_success
      end
    end

    describe 'POST create' do
      it 'returns a successful 200 response' do
        post :create, params: {user: {ct_id: 'AAAA'}}
        expect(response).to be_success
      end
    end
  end
end
