require 'rails_helper'

RSpec.describe Location, type: :model do
  it 'should be invalid when code not present' do
    expect(
      FactoryBot.build(:location, iso_code3: nil)
    ).to have(1).errors_on(:iso_code3)
  end
  let(:euu) {
    FactoryBot.create(:location, iso_code3: 'EUU', location_type: 'GROUP')
  }
  let(:pol) {
    FactoryBot.create(:location, iso_code3: 'POL', location_type: 'COUNTRY')
  }
  it 'has members' do
    euu.members << pol
    expect(euu.members).to eq([pol])
  end

  context do
    describe ':latest_socioeconomics' do
      let(:location) {
        FactoryBot.create(:location)
      }
      let!(:socio_gdp) {
        FactoryBot.create(
          :socioeconomic_indicator,
          gdp: 1,
          population: 0,
          population_growth: 2,
          year: 2016,
          location_id: location.id
        )
      }
      let!(:socio_ignore) {
        FactoryBot.create(
          :socioeconomic_indicator,
          gdp: 23,
          population: 0,
          population_growth: 3,
          year: 2015,
          location_id: location.id
        )
      }
      let!(:socio_population) {
        FactoryBot.create(
          :socioeconomic_indicator,
          gdp: 0,
          population: 2,
          population_growth: 4,
          year: 2014,
          location_id: location.id
        )
      }
      it 'returns gdp and population_growth of :socio_gdp, and population of :socio_population' do
        result = location.latest_socioeconomics
        expect(result[:gdp]).to eq(socio_gdp.gdp)
        expect(result[:gdp_year]).to eq(socio_gdp.year)
        expect(result[:population_growth]).to eq(socio_gdp.population_growth)
        expect(result[:population_growth_year]).to eq(socio_gdp.year)

        expect(result[:population]).to eq(socio_population.population)
        expect(result[:population_year]).to eq(socio_population.year)

        expect(result[:location]).to eq(location.iso_code3)
      end
    end
  end
end
