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
FactoryBot.define do
  factory :historical_emissions_data_source,
          class: 'HistoricalEmissions::DataSource' do
    name { 'MyText' }
    display_name { 'MyText' }
    metadata_dataset { 'historical_emissions_MyText' }
  end
end
