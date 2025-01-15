# == Schema Information
#
# Table name: indc_global_emissions
#
#  id                        :bigint           not null, primary key
#  year                      :integer          not null
#  historical_emission       :decimal
#  current_policies_scenario :decimal
#  ndcs_conditional_2020     :decimal
#  ndcs_unconditional_2020   :decimal
#  ndcs_conditional_2025     :decimal
#  ndcs_unconditional_2025   :decimal
#  target_2c                 :decimal
#  target_1_5c               :decimal
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#
FactoryBot.define do
  factory :indc_global_emission, class: 'Indc::GlobalEmission' do
    year { 2020 }
    historical_emission { 62.73 }
    current_policies_scenario { 56 }
    ndcs_conditional_2020 { 3.5 }
    ndcs_unconditional_2020 { 4.5 }
    ndcs_conditional_2025 { 5.5 }
    ndcs_unconditional_2025 { 6.5 }
    target_2c { 28 }
    target_1_5c { 17 }
    created_at { '2026-01-14 10:45:37' }
    updated_at { '2026-01-14 10:45:38' }
  end
end
