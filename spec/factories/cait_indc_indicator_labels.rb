FactoryGirl.define do
  factory :cait_indc_indicator_label, class: 'CaitIndc::IndicatorLabel' do
    association :indicator, factory: :cait_indc_indicator
    name 'MyText'
    color '#000'
  end
end
