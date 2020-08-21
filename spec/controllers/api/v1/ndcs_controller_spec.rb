require 'rails_helper'

describe Api::V1::NdcsController, type: :controller do
  context do
    let_it_be(:some_indc_values) {
      FactoryBot.create_list(
        :indc_indicator,
        3,
        :with_dependants
      )
    }

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_successful
      end

      it 'lists all indc indicators' do
        get :index
        expect(parsed_body['indicators'].length).to eq(3)
      end
    end

    describe 'GET content_overview' do
      it 'returns a successful 200 response' do
        code = some_indc_values.first.values.first.location.iso_code3
        get :content_overview, params: {code: code}
        expect(response).to be_successful
      end

      it 'returns a 404 not found when given an invalid iso code' do
        get :content_overview, params: {code: 'AAAA'}
        expect(response).to be_not_found
      end
    end

    describe 'GET index filtered by PRT-indc' do
      it 'returns a successful 200 response' do
        code = some_indc_values.first.values.first.location.iso_code3
        slug = some_indc_values.first.values.first.document.slug
        get :index, params: {locations_documents: "#{code}-#{slug}"}
        expect(response).to be_successful
      end

      it 'lists all relevant indc indicators' do
        source = some_indc_values.first.source.name
        code = some_indc_values.first.values.first.location.iso_code3
        slug = some_indc_values.first.values.first.document.slug
        get :index, params: {source: source, locations_documents: "#{code}-#{slug}"}
        expect(parsed_body['indicators'].length).to eq(1)
      end

      it 'lists all relevant normalized indc indicators' do
        ind = some_indc_values.first
        ind.normalized_slug = 'derpish'
        ind.save
        ind.reload
        source = ind.source.name
        code = ind.values.first.location.iso_code3
        slug = ind.values.first.document.slug
        get :index, params: {source: source, locations_documents: "#{code}-#{slug}"}
        expect(parsed_body['indicators'].length).to eq(1)
        expect(parsed_body['indicators'].first['slug']).to eq('derpish')
      end
    end
  end
end
