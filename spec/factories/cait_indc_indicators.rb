FactoryGirl.define do
  factory :cait_indc_indicator, class: 'CaitIndc::Indicator' do
    association :chart, factory: :cait_indc_chart
    association :indicator_type, factory: :cait_indc_indicator_type
    association :category, factory: :cait_indc_category
    name 'MyText'
  end
end
