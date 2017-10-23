FactoryGirl.define do
  factory :unfccc_document, class: 'Unfccc::Document' do
    name 'XYZZY'

    trait :with_dependants do
      transient do
        record_count 3
      end

      after(:create) do |document, evaluator|
        create_list(
          :unfccc_record,
          evaluator.record_count,
          :with_dependants,
          document: document
        )
      end
    end
  end
end

