RSpec.shared_context 'historical emissions records' do
  include_context 'locations'
  include_context 'historical emissions data sources'
  include_context 'historical emissions gwps'
  include_context 'historical emissions gases'
  include_context 'historical emissions sectors'

  let!(:record1) {
    FactoryBot.create(
      :historical_emissions_record,
      data_source: source_CW,
      sector: sector_energy,
      gas: gas_CO2,
      gwp: gwp_AR2,
      location: spain,
      emissions: [
        {year: 1990, value: 1},
        {year: 1991, value: 2}
      ]
    )
  }

  let!(:record2) {
    FactoryBot.create(
      :historical_emissions_record,
      data_source: source_PIK,
      sector: sector_agriculture,
      gas: gas_N2O,
      gwp: gwp_AR4,
      location: uk,
      emissions: [
        {year: 1990, value: 3},
        {year: 1991, value: 4},
        {year: 1992, value: nil}
      ]
    )
  }

  let!(:record_aggregated) {
    FactoryBot.create(
      :historical_emissions_record,
      data_source: source_PIK,
      sector: sector_total,
      gas: gas_N2O,
      gwp: gwp_AR4,
      location: uk,
      emissions: [
        {year: 1990, value: 3},
        {year: 1991, value: 4},
        {year: 1992, value: nil}
      ]
    )
  }
end
