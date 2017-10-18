module Api
  module V1
    module WriMetadata
      class SourceSerializer < ActiveModel::Serializer
        attribute :name, key: :source
        attribute :title
        attribute :subtitle
        attribute :technical_title
        attribute :source_organization
        attribute :learn_more_link
        attribute :summary
        attribute :description
        attribute :cautions
        attribute :geographic_coverage
        attribute :date_of_content
        attribute :frequency_of_updates
        attribute :summary_of_licenses
        attribute :terms_of_service_link
        attribute :citation
        attribute :published_language
        attribute :published_title

        def source
          object.name
        end

        def read_attribute_for_serialization(attribute)
          value = object.value_by_property(attribute)

          if value.nil? && object.methods.include?(attribute)
            object.send(attribute)
          elsif !value.nil?
            value.value
          end
        end
      end
    end
  end
end
