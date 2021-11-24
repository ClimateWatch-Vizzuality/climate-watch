FactoryBot.define do
  factory :country_profile_value, class: 'CountryProfile::Value' do
    location
    association :indicator, factory: :country_profile_indicator

    year { 1990 }
    value { 10 }
  end
end
