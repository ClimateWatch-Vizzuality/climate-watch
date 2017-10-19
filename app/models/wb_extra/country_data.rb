module WbExtra
  class CountryData < ApplicationRecord
    belongs_to :location
    validates :year, :population, :GDP, presence: true
  end
end
