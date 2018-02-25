require 'rails_helper'

RSpec.describe HistoricalEmissions::DataSource, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:historical_emissions_data_source, name: nil)
    ).to have(1).errors_on(:name)
  end
end
