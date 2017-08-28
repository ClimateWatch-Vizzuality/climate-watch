FactoryGirl.define do
  factory :cait_indc_indicator_value, class: 'CaitIndc::IndicatorValue' do
    association :indicator, factory: :cait_indc_indicator
    name 'MyText'
    color '#000'
  end
end
