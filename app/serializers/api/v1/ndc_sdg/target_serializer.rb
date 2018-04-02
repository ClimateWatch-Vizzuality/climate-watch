module Api
  module V1
    module NdcSdg
      class TargetSerializer < ActiveModel::Serializer
        attribute :title
        attribute :sectors
        attribute :document_type
        attribute :language

        def first_ndc
          ndc_targets = instance_options[:ndc_targets]
          ndc_targets.find { |ndc_target| ndc_target.target_id == object.id }.
          ndc
        end

        def document_type
          first_ndc.document_type
        end

        def language
          first_ndc.language
        end

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
