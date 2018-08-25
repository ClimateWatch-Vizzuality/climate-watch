require 'rails_helper'

RSpec.describe Api::V1::Data::HistoricalEmissionsCsvContent do
  include_context 'historical emissions records'

  before(:each) do
    HistoricalEmissions::NormalisedRecord.refresh
    HistoricalEmissions::SearchableRecord.refresh
  end

  describe :call do
    it 'replaces nulls with N/A' do
      params = {
        regions: [uk.iso_code3],
        source_ids: [source_PIK.id],
        gwp_ids: [gwp_AR4.id],
        gas_ids: [gas_N2O.id],
        sector_ids: [sector_agriculture.id],
        start_year: 1992
      }
      filter = Api::V1::Data::HistoricalEmissionsFilter.new(params)
      parsed_csv = CSV.parse(
        Api::V1::Data::HistoricalEmissionsCsvContent.new(filter).call
      )
      expect(parsed_csv.last.last).to eq('N/A')
    end
  end
end
