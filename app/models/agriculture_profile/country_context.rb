module AgricultureProfile
  class CountryContext < ApplicationRecord
    belongs_to :location

    validates_presence_of :year
  end
end