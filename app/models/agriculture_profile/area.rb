module AgricultureProfile
  class Area < ApplicationRecord
    belongs_to :location

    validates_presence_of :year

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_year, ->(year) { where(year: year) }

    def self.filter(params)
      area = Area.all
      area = area.by_year(params[:year]) if params[:year]
      area = area.by_location(params[:location_id]) if params[:location_id]
      area
    end
  end
end
