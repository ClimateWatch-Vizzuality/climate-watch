module AgricultureProfile
  class EmissionCategory < ApplicationRecord
    validates_presence_of :name
    validates_presence_of :unit
  end
end