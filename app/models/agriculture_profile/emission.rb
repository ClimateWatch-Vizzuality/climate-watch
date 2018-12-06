module AgricultureProfile
  class Emission < ApplicationRecord
    belongs_to :emission_subcategory, :class_name => 'AgricultureProfile::EmissionSubcategory'
    belongs_to :location

    validates_presence_of :value, :year
    validates_uniqueness_of :year, scope: %w[location_id emission_subcategory_id]
  end
end