require 'rails_helper'

RSpec.describe Api::V1::Data::HistoricalEmissionsFilter do
  include_context 'historical emissions records'

  before(:each) do
    HistoricalEmissions::NormalisedRecord.refresh
  end

  describe :call do
    it 'filters by subsector' do
      filter = Api::V1::Data::HistoricalEmissionsFilter.new(
        sector_ids: [sector_energy.id]
      )
      expect(filter.call.length).to eq(1)
    end

    it 'filters by top level sector' do
      filter = Api::V1::Data::HistoricalEmissionsFilter.new(
        sector_ids: [sector_total.id]
      )
      expect(filter.call.length).to eq(2)
    end

    it 'filters by country' do
      filter = Api::V1::Data::HistoricalEmissionsFilter.new(
        regions: [spain.iso_code3]
      )
      expect(filter.call.length).to eq(1)
    end

    it 'filters by region' do
      filter = Api::V1::Data::HistoricalEmissionsFilter.new(
        regions: [eu.iso_code3]
      )
      expect(filter.call.length).to eq(2)
    end
  end
end
