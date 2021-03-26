# == Schema Information
#
# Table name: indc_documents
#
#  id          :bigint           not null, primary key
#  ordering    :integer
#  slug        :string
#  long_name   :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  is_ndc      :boolean
#
FactoryBot.define do
  factory :indc_document, class: 'Indc::Document' do
    sequence(:ordering) { |n| n }
    sequence(:slug) { |n| "ndc_#{n}" }
    long_name { "MyString" }
    description { "MyText" }
  end
end
