FactoryBot.define do
  factory :adaptation_variable, class: 'Adaptation::Variable' do
    name 'MyText'
    sequence(:slug) { |n| ('aa'..'zz').to_a[n] }
  end
end
