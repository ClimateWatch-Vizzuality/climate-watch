# == Schema Information
#
# Table name: agriculture_profile_areas
#
#  id                           :bigint           not null, primary key
#  year                         :integer          not null
#  share_in_land_area_1         :float
#  share_in_land_area_2         :float
#  share_in_land_area_3         :float
#  share_in_land_area_4         :float
#  share_in_agricultural_area_1 :float
#  share_in_agricultural_area_2 :float
#  share_in_agricultural_area_3 :float
#  location_id                  :bigint
#
module AgricultureProfile
  class Area < ApplicationRecord
    belongs_to :location

    validates_presence_of :year

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_location_iso, ->(iso_code3) { joins(:location).where(locations: { iso_code3: iso_code3}) }
    scope :by_year, ->(year) { where(year: year) }

    def self.filter(params)
      area = Area.all
      area = area.by_year(params[:year]) if params[:year]
      area = area.by_location(params[:location_id]) if params[:location_id]
      area = area.by_location_iso(params[:iso_code3]) if params[:iso_code3]
      area
    end
  end
end
