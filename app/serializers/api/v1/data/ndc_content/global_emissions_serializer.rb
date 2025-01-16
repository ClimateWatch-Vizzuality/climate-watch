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

          # mapping them to float to ease parsing by the FE for now
          def historical_emission
            object.historical_emission.to_f
          end

          def current_policies_scenario
            object.current_policies_scenario.to_f
          end

          def ndcs_conditional_2020
            object.ndcs_conditional_2020.to_f
          end

          def ndcs_unconditional_2020
            object.ndcs_unconditional_2020.to_f
          end

          def ndcs_conditional_2025
            object.ndcs_conditional_2025.to_f
          end

          def ndcs_unconditional_2025
            object.ndcs_unconditional_2025.to_f
          end

          def target_2c
            object.target_2c.to_f
          end

          def target_1_5c
            object.target_1_5c.to_f
          end
        end
      end
    end
  end
end
