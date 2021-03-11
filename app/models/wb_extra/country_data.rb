# == Schema Information
#
# Table name: wb_extra_country_data
#
#  id          :bigint           not null, primary key
#  location_id :bigint
#  year        :integer
#  gdp         :bigint
#  population  :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
module WbExtra
  class CountryData < ApplicationRecord
    belongs_to :location
    validates :year, presence: true

    def self.filter_by_dates(start_year, end_year)
      return all unless start_year || end_year
      filtered_data = self
      if start_year
        filtered_data = filtered_data.
          filter_by_start_year(start_year)
      end

      if end_year
        filtered_data = filtered_data.
          filter_by_end_year(end_year)
      end

      filtered_data
    end

    def self.filter_by_start_year(start_year)
      start_year = start_year.to_i
      min_year = minimum(:year)
      start_year = min_year if min_year > start_year
      where('year >= ?', start_year)
    end

    def self.filter_by_end_year(end_year)
      end_year = end_year.to_i
      max_year = maximum(:year)
      end_year = max_year if max_year < end_year
      where('year <= ?', end_year)
    end

    def country_code
      Location.find(location_id).iso_code3
    end
  end
end
