require 'rails_helper'

describe Api::V1::MetadataController, type: :controller do
  context do
    let(:parsed_body) {
      JSON.parse(response.body)
    }
    let!(:some_acronyms) {
      FactoryGirl.create_list(:wri_metadata_acronym, 3)
    }
    let!(:some_metadat_values) {
      FactoryGirl.create_list(:wri_metadata_value, 5)
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'returns all known acronyms' do
        get :index
        expect(parsed_body.length).to eq(5)
      end
    end

    describe 'GET acronyms' do
      it 'returns a successful 200 response' do
        get :acronyms
        expect(response).to be_success
      end

      it 'lists all known acronyms' do
        get :acronyms
        expect(parsed_body.length).to eq(3)
      end
    end
  end
end
