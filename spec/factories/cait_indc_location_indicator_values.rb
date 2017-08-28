FactoryGirl.define do
  factory :cait_indc_location_indicator_value, class: 'CaitIndc::LocationIndicatorValue' do
    location
    association :indicator, factory: :cait_indc_indicator
    association :indicator_value, factory: :cait_indc_indicator_value
    custom_value nil
  end
end
