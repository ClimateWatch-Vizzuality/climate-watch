FactoryBot.define do
  factory :indc_adaptation_action, class: 'Indc::AdaptationAction' do
    location
    association :document, factory: :indc_document
    action { 'Develop and promote resilient and sustainable water resources management' }
  end
end
