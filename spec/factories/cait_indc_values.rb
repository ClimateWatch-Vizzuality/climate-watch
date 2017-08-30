FactoryGirl.define do
  factory :cait_indc_value, class: 'CaitIndc::Value' do
    location
    association :indicator, factory: :cait_indc_indicator
    association :label, factory: :cait_indc_label
    value nil
  end
end
