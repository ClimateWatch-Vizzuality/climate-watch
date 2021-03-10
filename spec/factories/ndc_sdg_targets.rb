# == Schema Information
#
# Table name: ndc_sdg_targets
#
#  id         :bigint           not null, primary key
#  number     :text             not null
#  title      :text             not null
#  goal_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :ndc_sdg_target, class: 'NdcSdg::Target' do
    association :goal, factory: :ndc_sdg_goal
    sequence(:number) { |n| ('00'..'99').to_a[n] }
    title { <<~EOT }
      'By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day'
    EOT

    trait :with_dependants do
      transient do
        ndc_target_count { 1 }
      end

      after(:create) do |target, evaluator|
        create_list(
          :ndc_sdg_ndc_target,
          evaluator.ndc_target_count,
          :with_dependants,
          target: target
        )
      end
    end
  end
end
