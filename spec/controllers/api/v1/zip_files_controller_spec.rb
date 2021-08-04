require 'rails_helper'

describe Api::V1::ZipFilesController, type: :controller do
  context do
    let!(:zip_files) {
      FactoryBot.create_list(:zip_file, 3)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_successful
      end

      it 'lists all zip files' do
        get :index
        parsed_body = JSON.parse(response.body)
        expect(parsed_body['data'].length).to eq(3)
      end
    end
  end
end
