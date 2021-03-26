# == Schema Information
#
# Table name: agriculture_profile_country_contexts
#
#  id                     :bigint           not null, primary key
#  year                   :integer          not null
#  employment_agri_female :float
#  employment_agri_male   :float
#  employment_agri_total  :float
#  total_pesticides_use   :float
#  total_fertilizers      :float
#  water_withdrawal       :float
#  water_withdrawal_rank  :integer
#  value_added_agr        :float
#  location_id            :bigint
#
module AgricultureProfile
  class CountryContext < ApplicationRecord
    belongs_to :location

    validates_presence_of :year

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_location_iso, ->(iso_code3) { joins(:location).where(locations: { iso_code3: iso_code3}) }
    scope :by_year, ->(year) { where(year: year) }

    def self.filter(params)
      context = CountryContext.all.includes(:location)
      context = context.by_year(params[:year]) if params[:year]
      context = context.by_location(params[:location_id]) if params[:location_id]
      context = context.by_location_iso(params[:iso_code3]) if params[:iso_code3]
      context
    end
  end
end
