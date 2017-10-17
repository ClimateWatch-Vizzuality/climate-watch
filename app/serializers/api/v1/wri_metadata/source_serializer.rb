module Api
  module V1
    module WriMetadata
      class SourceSerializer < ActiveModel::Serializer
        attribute :name, key: :slug
        attribute :title
        attribute :link
        attribute :organization, key: :sourceOrganization
        attribute :summary
        attribute :description

        def title
          select_by_property('title_75_character_limit')
        end

        def link
          select_by_property('learn_more_link')
        end

        def organization
          select_by_property('source_organization')
        end

        def summary
          select_by_property(
            'functionsummary_tagline_description'\
            '_of_what_data_says_150_character_limit'
          )
        end

        def description
          select_by_property(
            'description_recap_data_name_source_'\
            'organization_objectives_data_type_methodology'
          )
        end

        private

        def select_by_property(property)
          object.values.
            select do |value|
              value.property.name == property
            end.
            first.
            value
        end
      end
    end
  end
end
