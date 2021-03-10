# == Schema Information
#
# Table name: historical_emissions_gases
#
#  id         :bigint           not null, primary key
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :historical_emissions_gas,
          class: 'HistoricalEmissions::Gas' do
    name { 'MyText' }
  end
end
