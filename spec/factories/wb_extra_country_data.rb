# == Schema Information
#
# Table name: wb_extra_country_data
#
#  id          :bigint           not null, primary key
#  location_id :bigint
#  year        :integer
#  gdp         :bigint
#  population  :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :wb_extra_country_data, class: 'WbExtra::CountryData' do
    location { nil }
    year { 1970 }
    gdp { 10_000_000 }
    population { 19_993 }
  end
end
