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
