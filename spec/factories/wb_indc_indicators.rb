FactoryGirl.define do
  factory :wb_indc_indicator, class: 'WbIndc::Indicator' do
    association :indicator_type, factory: :wb_indc_indicator_type
    name 'MyText'
    code 'mytext'

    factory :wb_indc_indicator_with_dependants,
            class: 'WbIndc::Indicator' do
      transient do
        categories_count 2
      end

      after(:create) do |indicator, evaluator|
        indicator.categories = create_list(
          :wb_indc_category,
          evaluator.categories_count
        )
      end
    end
  end
end
