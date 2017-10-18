module WriMetadata
  class Property < ApplicationRecord
    has_many :values, class_name: 'WriMetadata::Value'

    validates :slug, presence: true, uniqueness: true
    validates :name, presence: true
  end
end
