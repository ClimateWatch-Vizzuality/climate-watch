FactoryGirl.define do
  factory :timeline_source, class: 'Timeline::Source' do
    name 'XYZZY'

    trait :with_dependants do
      transient do
        document_count 3
      end

      after(:create) do |source, evaluator|
        create_list(
          :document_record,
          evaluator.document_count,
          :with_dependants,
          source: source
        )
      end
    end
  end
end
