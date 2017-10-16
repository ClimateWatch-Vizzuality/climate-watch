require 'rails_helper'

describe Api::V1::NdcSdgsController, type: :controller do
  context do
    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end
    end

    describe 'GET show' do
      it 'returns a successful 200 response' do
        get :show, params: {code: 'AFG'}
        expect(response).to be_success
      end
    end

    describe 'GET overview' do
      it 'returns a successful 200 response' do
        get :overview
        expect(response).to be_success
      end
    end
  end
end

