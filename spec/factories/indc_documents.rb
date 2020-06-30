FactoryBot.define do
  factory :indc_document, class: 'Indc::Document' do
    sequence(:ordering) { |n| n }
    sequence(:slug) { |n| "ndc_#{n}" }
    long_name { "MyString" }
    description { "MyText" }
  end
end
