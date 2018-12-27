module AgricultureProfile
  class MeatTrade < ApplicationRecord
    belongs_to :location

    validates_presence_of :year

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_year, ->(year) { where(year: year) }

    def self.filter(params)
      trade = MeatTrade.all
      trade = trade.by_year(params[:year]) if params[:year]
      trade = trade.by_location(params[:location_id]) if params[:location_id]
      trade
    end
  end
end