require 'rails_helper'
require 'csv'

describe Api::V1::NdcSdgsController, type: :controller do
  context do
    let(:parsed_response) {
      JSON.parse(response.body)
    }

    describe 'GET index' do
      let!(:some_ndc_sdg_goals) {
        FactoryBot.create_list(:ndc_sdg_goal, 1, :with_dependants)
      }

      it 'returns a successful 200 response' do
        get :index
        expect(response).to be_success
      end

      it 'returns a list of sectors' do
        get :index
        sectors = some_ndc_sdg_goals.flat_map(&:targets).flat_map(&:sectors)
        expect(parsed_response['sectors'].count).to eq(sectors.count)
      end

      it 'returns a list of targets' do
        get :index
        targets = some_ndc_sdg_goals.flat_map(&:targets)
        expect(parsed_response['targets'].count).to eq(targets.count)
      end

      it 'returns a list of goals' do
        get :index
        goals = some_ndc_sdg_goals
        expect(parsed_response['goals'].count).to eq(goals.count)
      end
    end

    describe 'GET show' do
      let!(:some_ndc_sdg_goal) {
        FactoryBot.create(:ndc_sdg_goal, :with_dependants)
      }

      let(:some_ndc_sdg_goal_location) {
        some_ndc_sdg_goal.targets.first.ndc_targets.first.ndc.
          location.iso_code3
      }

      it 'returns a successful 200 response' do
        get :show, params: {code: some_ndc_sdg_goal_location}
        expect(response).to be_success
      end

      it 'returns a 404 not found when givenm an invalid location' do
        get :show, params: {code: 'AAAA'}
        expect(response).to be_not_found
      end

      it 'returns a list of sectors' do
        sectors = some_ndc_sdg_goal.targets.flat_map(&:sectors)
        get :show, params: {code: some_ndc_sdg_goal_location}
        expect(parsed_response['sectors'].length).to eq(sectors.count)
      end

      it 'returns a list of goals' do
        get :show, params: {code: some_ndc_sdg_goal_location}
        expect(parsed_response['sdgs'].length).to eq(1)
      end
    end

    describe 'GET sdgs_overview' do
      let!(:some_ndc_sdg_goals) {
        FactoryBot.create_list(:ndc_sdg_goal, 5, :with_dependants)
      }

      it 'returns a successful 200 response' do
        get :sdgs_overview
        expect(response).to be_success
      end

      it 'returns a list of goals' do
        get :sdgs_overview
        expect(parsed_response.length).to eq(5)
      end
    end

    describe 'GET linkages_dataset' do
      let!(:some_ndc_sdg_goals) {
        FactoryBot.create_list(:ndc_sdg_goal, 5, :with_dependants)
      }

      it 'returns a successful 200 response' do
        get :linkages_dataset
        expect(response).to be_success
      end

      it 'returns a list of goals' do
        get :linkages_dataset
        csv = CSV.parse(response.body)
        expect(csv.length).to eq(6)
      end
    end
  end
end
