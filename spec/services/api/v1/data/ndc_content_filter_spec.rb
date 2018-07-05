require 'rails_helper'

RSpec.describe Api::V1::Data::NdcContentFilter do
  include_context 'NDC values'

  describe :call do
    it 'filters by subsector' do
      filter = Api::V1::Data::NdcContentFilter.new(
        sector_ids: [vehicle_fleet.id]
      )
      expect(filter.call.length).to eq(1)
    end

    it 'filters by top level sector' do
      filter = Api::V1::Data::NdcContentFilter.new(
        sector_ids: [transport.id]
      )
      expect(filter.call.length).to eq(2)
    end
  end
end
