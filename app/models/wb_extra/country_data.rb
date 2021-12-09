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

    scope :filter_by_start_year, ->(year) { where('year >= ?', year) }
    scope :filter_by_end_year, ->(year) { where('year <= ?', year) }

    def country_code
      Location.find(location_id).iso_code3
    end
  end
end
