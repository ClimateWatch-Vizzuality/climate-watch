# == Schema Information
#
# Table name: agriculture_profile_meat_consumptions
#
#  id                            :bigint           not null, primary key
#  year                          :integer          not null
#  meat_consumption_1            :float
#  meat_consumption_2            :float
#  meat_consumption_3            :float
#  meat_consumption_4            :float
#  meat_consumption_per_capita_1 :float
#  meat_consumption_per_capita_2 :float
#  meat_consumption_per_capita_3 :float
#  meat_consumption_per_capita_4 :float
#  location_id                   :bigint
#
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
