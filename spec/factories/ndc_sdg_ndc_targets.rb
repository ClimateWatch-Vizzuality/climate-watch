# == Schema Information
#
# Table name: ndc_sdg_ndc_targets
#
#  id                  :bigint           not null, primary key
#  ndc_id              :bigint
#  target_id           :bigint
#  indc_text           :text
#  status              :text
#  climate_response    :text
#  type_of_information :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  starts_at           :integer
#  ends_at             :integer
#
FactoryBot.define do
  factory :ndc_sdg_ndc_target, class: 'NdcSdg::NdcTarget' do
    ndc
    association :target, factory: :ndc_sdg_target
    indc_text { 'MyText' }
    status { 'MyText' }
    climate_response { 'MyText' }
    type_of_information { 'MyText' }

    trait :with_dependants do
      transient do
        sector_count { 1 }
      end

      after(:create) do |ndc_target, evaluator|
        ndc_target.sectors = create_list(
          :ndc_sdg_sector,
          evaluator.sector_count
        )
      end
    end
  end
end
