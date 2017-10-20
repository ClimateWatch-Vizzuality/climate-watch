FactoryGirl.define do
  factory :wb_extra_country_data, class: 'WbExtra::CountryData' do
    location nil
    year 1970
    gdp 10_000_000
    population 19_993
  end
end
