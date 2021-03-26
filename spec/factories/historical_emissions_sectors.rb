# == Schema Information
#
# Table name: historical_emissions_sectors
#
#  id             :bigint           not null, primary key
#  parent_id      :bigint
#  data_source_id :bigint
#  name           :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  annex_type     :text
#
FactoryBot.define do
  factory :historical_emissions_sector,
          class: 'HistoricalEmissions::Sector' do
    association :data_source,
                factory: :historical_emissions_data_source
    name { 'MyText' }
  end
end
