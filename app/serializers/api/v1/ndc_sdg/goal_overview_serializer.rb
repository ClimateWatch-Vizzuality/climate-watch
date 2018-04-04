module Api
  module V1
    module NdcSdg
      class GoalOverviewSerializer < ActiveModel::Serializer
        attribute :id
        attribute :number
        attribute :locations
        attribute :targets
        attribute :colour

        def targets
          object.targets.map(&:number)
        end

        def locations
          targets = object.targets.
            flat_map do |target|
              target.ndc_targets.map do |ndc_target|
                [
                  ndc_target.ndc.location.iso_code3,
                  ndc_target.ndc.document_type,
                  ndc_target.ndc.language,
                  target.number
                ]
              end
            end

          targets.group_by(&:first).
            transform_values do |value|
              {
                numbers: value.map(&:last).uniq.sort,
                document_type: value.first.second,
                language: value.first.third
              }
            end
        end
      end
    end
  end
end
