FactoryGirl.define do
  factory :indc_value, class: 'Indc::Value' do
    location
    association :indicator, factory: :indc_indicator
    association :label, factory: :indc_label
    association :sector, factory: :indc_sector
    value 'myvalue'
  end
end
