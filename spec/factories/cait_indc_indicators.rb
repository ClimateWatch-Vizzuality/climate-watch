FactoryGirl.define do
  factory :cait_indc_indicator, class: 'CaitIndc::Indicator' do
    association :chart, factory: :cait_indc_chart
    association :category, factory: :cait_indc_category
    name 'MyText'
    slug 'my-text'

    factory :cait_indc_indicator_with_dependants,
            class: 'CaitIndc::Indicator' do
      transient do
        values_count 3
        labels_count 2
      end

      after(:create) do |indicator, evaluator|
        labels = create_list(
          :cait_indc_label,
          evaluator.labels_count,
          indicator: indicator
        )

        create_list(
          :cait_indc_value,
          evaluator.values_count,
          indicator: indicator,
          label: labels.sample
        )
      end
    end
  end
end
