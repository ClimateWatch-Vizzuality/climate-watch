# == Schema Information
#
# Table name: timeline_documents
#
#  id          :bigint           not null, primary key
#  source_id   :bigint
#  location_id :bigint
#  link        :text
#  text        :text
#  date        :date
#  language    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :timeline_document, class: 'Timeline::Document' do
    association :source, factory: :timeline_source
    location
    link { 'http://xyzzy.abc/fgsfds' }
    text { 'MyText' }

    trait :with_dependants do
      transient do
        note_count { 2 }
      end

      after(:create) do |document, evaluator|
        create_list(
          :timeline_note,
          evaluator.note_count,
          document: document
        )
      end
    end
  end
end
