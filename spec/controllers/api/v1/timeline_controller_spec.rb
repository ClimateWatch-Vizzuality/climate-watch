require 'rails_helper'

describe Api::V1::TimelineController, type: :controller do
  context do
    let!(:some_location) {
      FactoryGirl.create(:location)
    }
    let!(:some_documents) {
      FactoryGirl.create_list(:timeline_document, 3, location: some_location)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'lists all timeline documents' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
      end

      it 'lists all timeline documents under a particular location' do
        get :show, params: {code: some_location.iso_code3}
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(3)
      end
    end
  end
end

