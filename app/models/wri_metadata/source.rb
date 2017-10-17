module WriMetadata
  class Source < ApplicationRecord
    has_many :values, class_name: 'WriMetadata::Value'

    validates :name, presence: true

    def value_by_property(property)
      self.values.
        find do |value|
          value.property.slug == property.to_s
        end.
        value
    end
  end
end
