# == Schema Information
#
# Table name: historical_emissions_records
#
#  id             :bigint           not null, primary key
#  location_id    :bigint
#  data_source_id :bigint
#  sector_id      :bigint
#  gas_id         :bigint
#  emissions      :jsonb
#  gwp_id         :bigint
#
require 'rails_helper'

RSpec.describe HistoricalEmissions::Record, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryBot.build(:historical_emissions_record, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid when data_source not present' do
    expect(
      FactoryBot.build(:historical_emissions_record, data_source: nil)
    ).to have(1).errors_on(:data_source)
  end

  it 'should be invalid when sector not present' do
    expect(
      FactoryBot.build(:historical_emissions_record, sector: nil)
    ).to have(1).errors_on(:sector)
  end

  it 'should be invalid when gas not present' do
    expect(
      FactoryBot.build(:historical_emissions_record, gas: nil)
    ).to have(1).errors_on(:gas)
  end
end
