FactoryBot.define do
  factory :indc_document, class: 'Indc::Document' do
    ordering { "" }
    slug { "MyString" }
    long_name { "MyString" }
    description { "MyText" }
  end
end
