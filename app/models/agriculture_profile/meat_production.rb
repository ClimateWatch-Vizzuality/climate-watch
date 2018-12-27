module AgricultureProfile
  class MeatProduction < ApplicationRecord
    belongs_to :location

    validates_presence_of :year

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_year, ->(year) { where(year: year) }

    def self.filter(params)
      production = MeatProduction.all
      production = production.by_year(params[:year]) if params[:year]
      production = production.by_location(params[:location_id]) if params[:location_id]
      production
    end
  end
end