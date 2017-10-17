module WriMetadata
  class Property < ApplicationRecord
    has_many :values, class_name: 'WriMetadata::Value'
  end
end
