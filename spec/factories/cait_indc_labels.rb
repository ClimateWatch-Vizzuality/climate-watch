FactoryGirl.define do
  factory :cait_indc_label, class: 'CaitIndc::Label' do
    association :indicator, factory: :cait_indc_indicator
    name 'MyText'
  end
end
