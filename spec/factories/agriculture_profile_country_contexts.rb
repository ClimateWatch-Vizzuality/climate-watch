# == Schema Information
#
# Table name: agriculture_profile_country_contexts
#
#  id                     :bigint           not null, primary key
#  year                   :integer          not null
#  employment_agri_female :float
#  employment_agri_male   :float
#  employment_agri_total  :float
#  total_pesticides_use   :float
#  total_fertilizers      :float
#  water_withdrawal       :float
#  water_withdrawal_rank  :integer
#  value_added_agr        :float
#  location_id            :bigint
#
FactoryBot.define do
  factory :agriculture_profile_country_context,
          class: 'AgricultureProfile::CountryContext' do
    sequence(:year) { |n| 1960 + n }
    sequence(:employment_agri_male) { |n| 8.538000107 + (n * 0.0002) }
    sequence(:employment_agri_female) { |n| 6.613999844 - (n * 0.0001) }
    sequence(:employment_agri_total) { |n| 7.403999805 + (n * 0.0001) }
    sequence(:total_pesticides_use) { |n| 4487 + n }
    sequence(:total_fertilizers) { |n| 288_700 + n }
    sequence(:water_withdrawal) { |n| 2.75 + (n * 0.01) }
    sequence(:water_withdrawal_rank) { |n| n }
    sequence(:value_added_agr) { |n| 2.347019 + (n * 0.01) }

    association :location, factory: :location
  end
end
