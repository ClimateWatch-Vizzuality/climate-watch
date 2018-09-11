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
