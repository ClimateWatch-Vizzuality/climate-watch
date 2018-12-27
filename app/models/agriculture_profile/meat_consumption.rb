module AgricultureProfile
  class MeatConsumption < ApplicationRecord
    belongs_to :location

    validates_presence_of :year

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_year, ->(year) { where(year: year) }

    def self.filter(params)
      consumption = MeatConsumption.all
      consumption = consumption.by_year(params[:year]) if params[:year]
      consumption = consumption.by_location(params[:location_id]) if params[:location_id]
      consumption
    end
  end
end