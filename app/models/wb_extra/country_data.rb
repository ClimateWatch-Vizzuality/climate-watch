module WbExtra
  class CountryData < ApplicationRecord
    belongs_to :location
    validates :year, :population, :gdp, presence: true

    def self.filter_by_dates(start_year, end_year)
      return self.all if !(start_year || end_year)
      filtered_data = self
      filtered_data = filtered_data.filter_by_start_year(start_year) if start_year
      filtered_data = filtered_data.filter_by_end_year(end_year) if end_year
      filtered_data
    end

    def self.filter_by_start_year(start_year)
        start_year = start_year.to_i
        min_year = self.minimum(:year)
        start_year = min_year if min_year > start_year
        self.where('year >= ?', start_year)
    end

    def self.filter_by_end_year(end_year)
        end_year = end_year.to_i
        max_year = self.maximum(:year)
        end_year = max_year if max_year < end_year
        country_data = self.where( 'year <= ?', end_year)
    end
  end
end
