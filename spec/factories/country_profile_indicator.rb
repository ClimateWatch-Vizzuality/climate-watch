FactoryBot.define do
  factory :country_profile_indicator, class: 'CountryProfile::Indicator' do
    sequence(:slug) { |n| "indicator_slug_#{n}" }
    name { 'Indicator name' }

    trait :with_values do
      transient do
        location { build(:location) }
      end

      after(:create) do |i, evaluator|
        create_list :country_profile_value, 4, indicator: i, location: evaluator.location
      end
    end
  end
end
