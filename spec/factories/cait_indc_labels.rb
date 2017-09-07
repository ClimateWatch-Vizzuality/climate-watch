FactoryGirl.define do
  factory :cait_indc_label, class: 'CaitIndc::Label' do
    association :indicator, factory: :cait_indc_indicator
    name 'MyText'
    color '#000'
  end
end
