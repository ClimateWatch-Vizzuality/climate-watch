module WriMetadata
  class Source < ApplicationRecord
    has_many :values, class_name: 'WriMetadata::Value'

    validates :name, presence: true

    def value_by_property(property)
      values.
        find do |v|
          v.property.slug == property.to_s
        end
    end
  end
end
