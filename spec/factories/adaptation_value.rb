FactoryBot.define do
  factory :adaptation_value, class: 'Adaptation::Value' do
    location
    association :variable, factory: :adaptation_variable
  end
end
