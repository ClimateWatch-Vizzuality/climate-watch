# == Schema Information
#
# Table name: ndc_sdg_goals
#
#  id         :bigint           not null, primary key
#  number     :text             not null
#  title      :text             not null
#  cw_title   :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  colour     :text             not null
#
FactoryBot.define do
  factory :ndc_sdg_goal, class: 'NdcSdg::Goal' do
    sequence(:number) { |n| ('00'..'99').to_a[n] }
    title { 'End poverty in all its forms everywhere' }
    cw_title { 'No poverty' }
    colour { '#000000' }

    trait :with_dependants do
      transient do
        target_count { 1 }
      end

      after(:create) do |goal, evaluator|
        create_list(
          :ndc_sdg_target,
          evaluator.target_count,
          :with_dependants,
          goal: goal
        )
      end
    end
  end
end
