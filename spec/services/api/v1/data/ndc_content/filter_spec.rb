require 'rails_helper'

RSpec.describe Api::V1::Data::NdcContent::Filter do
  include_context 'NDC values'

  before(:each) do
    Indc::SearchableValue.refresh
  end

  describe :call do
    it 'filters by subsector' do
      filter = Api::V1::Data::NdcContent::Filter.new(
        sector_ids: [vehicle_fleet.id]
      )
      expect(filter.call.length).to eq(2)
    end

    it 'filters by top level sector' do
      filter = Api::V1::Data::NdcContent::Filter.new(
        sector_ids: [transport.id]
      )
      expect(filter.call.length).to eq(3)
    end

    it 'filters by subcategory' do
      filter = Api::V1::Data::NdcContent::Filter.new(
        category_ids: [sectoral_plans.id]
      )
      expect(filter.call.length).to eq(1)
    end

    it 'filters by top level category' do
      filter = Api::V1::Data::NdcContent::Filter.new(
        category_ids: [sectoral_information.id]
      )
      expect(filter.call.length).to eq(2)
    end
  end
end
