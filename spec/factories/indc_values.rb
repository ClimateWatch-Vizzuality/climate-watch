FactoryBot.define do
  factory :indc_value, class: 'Indc::Value' do
    location
    association :indicator, factory: :indc_indicator
    association :label, factory: :indc_label
    association :sector, factory: :indc_sector
    association :document, factory: :indc_document
    value { 'myvalue' }
  end
end
