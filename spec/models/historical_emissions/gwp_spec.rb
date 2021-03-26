# == Schema Information
#
# Table name: historical_emissions_gwps
#
#  id         :bigint           not null, primary key
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe HistoricalEmissions::Gwp, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:historical_emissions_gwp, name: nil)
    ).to have(1).errors_on(:name)
  end
end
