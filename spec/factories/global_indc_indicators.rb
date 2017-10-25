FactoryGirl.define do
  factory :global_indc_indicator, class: 'GlobalIndc::Indicator' do

    trait :with_cait_reference do
      after(:create) do |indicator|
        indicator.cait_indicator = create(:cait_indc_indicator)
      end
    end

    trait :with_wb_reference do
      after(:create) do |indicator|
        indicator.wb_indicator = create(:wb_indc_indicator)
      end
    end
  end
end

