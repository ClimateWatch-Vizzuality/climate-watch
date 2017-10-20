module Api
  module V1
    module NdcSdg
      class TargetSerializer < ActiveModel::Serializer
        attribute :title
        attribute :sectors

        def sectors
          ndc_targets = instance_options[:ndc_targets]
          ndc_targets.
            select { |ndc_target| ndc_target.target_id == object.id }.
            flat_map(&:sector_ids).
            uniq.
            sort
        end
      end
    end
  end
end
