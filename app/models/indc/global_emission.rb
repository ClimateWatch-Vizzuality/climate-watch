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
module Indc
  class GlobalEmission < ApplicationRecord
    validates :year, presence: true, numericality: {only_integer: true}
    validates :historical_emission, numericality: true, allow_nil: true
    validates :current_policies_scenario, numericality: true, allow_nil: true
    validates :ndcs_conditional_2020, numericality: true, allow_nil: true
    validates :ndcs_unconditional_2020, numericality: true, allow_nil: true
    validates :ndcs_conditional_2025, numericality: true, allow_nil: true
    validates :ndcs_unconditional_2025, numericality: true, allow_nil: true
    validates :target_2c, numericality: true, allow_nil: true
    validates :target_1_5c, numericality: true, allow_nil: true
  end
end
