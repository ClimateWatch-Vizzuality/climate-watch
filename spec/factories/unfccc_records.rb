FactoryGirl.define do
  factory :unfccc_record, class: 'Unfccc::Record' do
    association :document, factory: :unfccc_document
    location
    link 'http://xyzzy.abc/fgsfds'
    text 'MyText'

    trait :with_dependants do
      transient do
        note_count 2
      end

      after(:create) do |record, evaluator|
        create_list(
          :unfccc_note,
          evaluator.note_count,
          record: record
        )
      end
    end
  end
end

