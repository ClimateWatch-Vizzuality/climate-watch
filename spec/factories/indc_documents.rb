FactoryBot.define do
  factory :indc_document, class: 'Indc::Document' do
    sequence(:ordering) { |n| n }
    sequence(:slug) { |n| "#{n}_document" }
    long_name { "MyString" }
    description { "MyText" }
  end
end
