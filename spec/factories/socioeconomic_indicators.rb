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
FactoryBot.define do
  factory :socioeconomic_indicator, class: 'Socioeconomic::Indicator' do
    location
    sequence(:year) { |n| 2015 + n }
    gdp { 17_930_239_400 }
    gdp_rank { 110 }
    gdp_per_capita { 603.5370231 }
    gdp_per_capita_rank { 175 }
    population { 34_656_032 }
    population_rank { 40 }
    population_growth { 2.689163473 }
    population_growth_rank { 28 }
  end
end
