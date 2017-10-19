require 'rails_helper'

describe Api::V1::WbExtraCountryDataController, type: :controller do
  context do
    let(:location) { FactoryGirl.create(:location, iso_code3: 'AFG', location_type: 'COUNTRY') }
    let!(:wb_extra_country_data) { FactoryGirl.create(:wb_extra_country_data, location: location) }
    let!(:wb_extra_country_data_1960) { FactoryGirl.create(:wb_extra_country_data, location: location, year: "1960") }
    let!(:wb_extra_country_data_1990) { FactoryGirl.create(:wb_extra_country_data, location: location, year: "1990") }
    let!(:wb_extra_country_data_2000) { FactoryGirl.create(:wb_extra_country_data, location: location, year: "2000") }
    
    describe 'GET show' do
      it 'returns a successful 200 response' do
        get :show, params: { :iso => "AFG" }
        expect(response).to be_success
      end

      it 'lists all wb_extra_country_data for a country' do
        get :show, params: { :iso => "AFG" }
        parsed_body = JSON.parse(response.body)
        expect(parsed_body.length).to eq(4)
      end

      it 'finds only the wb_extra_country_data between the start and the end year' do
        get :show, params: { :iso => "AFG", :startYear => "1980", :endYear => "1998" }
        parsed_body = JSON.parse(response.body)
        p parsed_body
        expect(parsed_body.length).to eq(1)
      end
    end
  end
end
