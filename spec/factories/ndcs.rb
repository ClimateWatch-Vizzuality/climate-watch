# == Schema Information
#
# Table name: ndcs
#
#  id            :bigint           not null, primary key
#  location_id   :bigint
#  full_text     :text
#  full_text_tsv :tsvector
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  document_type :text             default("ndc")
#  language      :text
#  translated    :boolean          default(FALSE)
#
FactoryBot.define do
  factory :ndc do
    location
    full_text { 'MyText' }
    full_text_tsv { 'MyText' }
    document_type { 'ndc' }
    language { 'EN' }
    translated { false }
  end
end
