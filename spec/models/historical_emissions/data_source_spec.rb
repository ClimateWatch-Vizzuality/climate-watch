# == Schema Information
#
# Table name: historical_emissions_data_sources
#
#  id               :bigint           not null, primary key
#  name             :text
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  display_name     :text             not null
#  metadata_dataset :text             not null
#
require 'rails_helper'

RSpec.describe HistoricalEmissions::DataSource, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:historical_emissions_data_source, name: nil)
    ).to have(1).errors_on(:name)
  end
end
