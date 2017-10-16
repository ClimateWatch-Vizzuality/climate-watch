FactoryGirl.define do
  factory :wb_indc_value, class: 'WbIndc::Value' do
    association :indicator, factory: :wb_indc_indicator
    location
    value 'MyText'
  end
end
