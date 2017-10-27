FactoryGirl.define do
  factory :indc_label, class: 'Indc::Label' do
    association :indicator, factory: :indc_indicator
    value 'MyLabel'
    sequence :index { |n|  (0..99).to_a[n] }
  end
end
