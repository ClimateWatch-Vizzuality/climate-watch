module Api
  module V1
    module Quantification
      class ValueSerializer < ActiveModel::Serializer
        attribute :location
        attribute :year
        attribute :value
        attribute :label
        attribute :document_slug
        attribute :latest

        def location
          object.location.iso_code3
        end

        def label
          object.label.name
        end

        def value
          if object.first_value.present? && object.second_value.blank?
            object.first_value
          elsif object.first_value.present? && object.second_value.present?
            [object.first_value, object.second_value]
          end
        end

        def latest
          return true if ['net-zero target', 'lts'].include? object.document_slug.downcase
          return unless instance_options[:latest_ndc_submissions].present?

          instance_options[:latest_ndc_submissions][object.location]&.first&.document&.slug ==
            object.document_slug
        end
      end
    end
  end
end
