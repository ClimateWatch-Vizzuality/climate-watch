require 'rails_helper'

RSpec.describe Api::V1::Data::HistoricalEmissionsFilter do
  include_context 'historical emissions records'

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
  end
end
