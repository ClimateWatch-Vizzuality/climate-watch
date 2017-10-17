module WriMetadata
  class Acronym < ApplicationRecord
    validates :acronym, presence: true, uniqueness: true
    validates :definition, presence: true
  end
end
