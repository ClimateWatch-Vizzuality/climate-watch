FactoryGirl.define do
  factory :cait_indc_value, class: 'CaitIndc::Value' do
    location
    association :indicator, factory: :cait_indc_indicator
    association :indicator_label, factory: :cait_indc_indicator_label
    value nil
  end
end
