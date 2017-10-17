module WriMetadata
  class Value < ApplicationRecord
    belongs_to :source, class_name: 'WriMetadata::Source'
    belongs_to :property, class_name: 'WriMetadata::Property'
  end
end
