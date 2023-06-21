require 'rails_helper'

describe Api::V1::StoriesController, type: :controller do
  context do
    let!(:some_stories) { FactoryBot.create_list(:story, 7) }
    let!(:story_with_wri_background_image) do
      create :story, background_image_url: 'https://files.wri.org/d8/s3fs-public/2023-03/ipcc-flooding_0.jpg'
    end

    describe 'GET index' do
      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_successful
      end

      it 'lists six stories' do
        get :index, params: {limit: 6}
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(6)
      end

      it 'returns resized background image url for WRI images' do
        get :index
        parsed_body = JSON.parse response.body
        response = parsed_body.find { |story| story['title'] == story_with_wri_background_image.title }
        expect(response['background_image_url']).to include('https://files.wri.org/d8/s3fs-public/styles/500x300/s3/2023-03/ipcc-flooding_0.jpg')
      end
    end
  end
end
