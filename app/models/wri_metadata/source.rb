module WriMetadata
  class Source < ApplicationRecord
    has_many :values, class_name: 'WriMetadata::Value'
  end
end
