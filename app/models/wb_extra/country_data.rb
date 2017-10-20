module WbExtra
  class CountryData < ApplicationRecord
    belongs_to :location
    validates :year, :population, :gdp, presence: true
  end
end
