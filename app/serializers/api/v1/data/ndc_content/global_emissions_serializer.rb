module Api
  module V1
    module Data
      module NdcContent
        class GlobalEmissionsSerializer < ActiveModel::Serializer
          attributes :id,
                     :year,
                     :historical_emission,
                     :current_policies_scenario,
                     :ndcs_conditional_2020,
                     :ndcs_unconditional_2020,
                     :ndcs_conditional_2025,
                     :ndcs_unconditional_2025,
                     :target_2c,
                     :target_1_5c,
                     :created_at,
                     :updated_at
        end
      end
    end
  end
end
