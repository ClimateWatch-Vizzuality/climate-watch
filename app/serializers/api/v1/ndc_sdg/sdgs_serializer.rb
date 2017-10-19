module Api
  module V1
    module NdcSdg
      class SdgsSerializer < ActiveModel::Serializer
        attribute :cw_title, key: :title
        attribute :colour
        attribute :targets

        def targets
          ndc_targets = instance_options[:ndc_targets]
          targets = ndc_targets.
            map(&:target).
            select do |target|
              target.goal_id == object.id
            end

          IndexedSerializer.serialize(
            targets,
            ndc_targets: ndc_targets,
            serializer: Api::V1::NdcSdg::TargetSerializer
          ) do |target|
            target.number
          end
        end
      end
    end
  end
end
