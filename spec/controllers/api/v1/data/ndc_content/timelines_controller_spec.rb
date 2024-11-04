require 'rails_helper'

RSpec.describe Api::V1::Data::NdcContent::TimelinesController, type: :controller do
  describe 'GET index' do
    before do
      FactoryBot.create_list :indc_timeline, 3
    end

    it 'returns all timelines' do
      get :index
      expect(response).to match_response_schema('ndc_content_timelines')
    end

    context 'when filtered by timeline location' do
      let(:location) { FactoryBot.create :location }

      before do
        FactoryBot.create :indc_timeline, location: location
      end

      it 'returns timelines filtered by location' do
        get :index, params: {location_id: location.id}
        expect(JSON.parse(response.body)["data"].pluck("location_id").uniq).to eq([location.id])
      end
    end

    context 'when filtered by date' do
      let(:date) { Date.new(2000, 1, 1) }

      before do
        FactoryBot.create :indc_timeline, date: date
      end

      it 'returns timelines which are newer then from date' do
        get :index, params: {date_from: date}
        expect(JSON.parse(response.body)["data"].pluck("date").uniq).to all(be >= date.to_s)
      end

      it 'returns timelines which are older then to date' do
        get :index, params: {date_to: date}
        expect(JSON.parse(response.body)["data"].pluck("date").uniq).to all(be <= date.to_s)
      end
    end
  end
end
