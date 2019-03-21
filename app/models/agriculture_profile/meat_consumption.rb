module AgricultureProfile
  class MeatConsumption < ApplicationRecord
    include LocationCountable
    belongs_to :location

    validates_presence_of :year

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_location_iso, ->(iso_code3) { joins(:location).where(locations: { iso_code3: iso_code3}) }
    scope :by_year, ->(year) { where(year: year) }

    def self.filter(params)
      consumption = MeatConsumption.all
      consumption = consumption.by_year(params[:year]) if params[:year]
      consumption = consumption.by_location(params[:location_id]) if params[:location_id]
      consumption = consumption.by_location_iso(params[:iso_code3]) if params[:iso_code3]
      consumption
    end
  end
end
