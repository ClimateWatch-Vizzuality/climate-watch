FactoryBot.define do
  factory :ndc do
    location
    full_text 'MyText'
    full_text_tsv 'MyText'
    document_type 'ndc'
    language 'EN'
    translated false
  end
end
