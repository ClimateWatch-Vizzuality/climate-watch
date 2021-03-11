# == Schema Information
#
# Table name: socioeconomic_indicators
#
#  id                     :bigint           not null, primary key
#  location_id            :bigint
#  year                   :integer          not null
#  gdp                    :bigint
#  gdp_rank               :integer
#  gdp_per_capita         :float
#  gdp_per_capita_rank    :integer
#  population             :bigint
#  population_rank        :integer
#  population_growth      :float
#  population_growth_rank :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
require 'rails_helper'

RSpec.describe Socioeconomic::Indicator, type: :model do
  it 'should be invalid without year' do
    expect(
      FactoryBot.build(:socioeconomic_indicator, year: nil)
    ).to have(1).errors_on(:year)
  end

  it 'should be invalid when year is taken' do
    location = FactoryBot.create(:location)
    FactoryBot.create(
      :socioeconomic_indicator,
      year: 2015,
      location: location
    )
    expect(
      FactoryBot.build(
        :socioeconomic_indicator,
        year: 2015,
        location: location
      )
    ).to have(1).errors_on(:year)
  end
end
