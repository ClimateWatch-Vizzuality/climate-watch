# == Schema Information
#
# Table name: historical_emissions_gwps
#
#  id         :bigint           not null, primary key
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :historical_emissions_gwp,
          class: 'HistoricalEmissions::Gwp' do
    name { 'AR4' }
  end
end
