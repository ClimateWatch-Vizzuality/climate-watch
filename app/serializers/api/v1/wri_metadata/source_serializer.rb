module Api
  module V1
    module WriMetadata
      class SourceSerializer < ActiveModel::Serializer
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

        def read_attribute_for_serialization(attribute)
          object.value_by_property(attribute)
        end

      end
    end
  end
end
