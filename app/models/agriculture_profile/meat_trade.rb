# == Schema Information
#
# Table name: agriculture_profile_meat_trades
#
#  id             :bigint           not null, primary key
#  year           :integer          not null
#  trade_import_1 :integer
#  trade_import_2 :integer
#  trade_import_3 :integer
#  trade_import_4 :integer
#  trade_import_5 :integer
#  trade_import_6 :integer
#  trade_import_7 :integer
#  trade_import_8 :integer
#  trade_export_1 :integer
#  trade_export_2 :integer
#  trade_export_3 :integer
#  trade_export_4 :integer
#  trade_export_5 :integer
#  trade_export_6 :integer
#  trade_export_7 :integer
#  trade_export_8 :integer
#  location_id    :bigint
#
module AgricultureProfile
  class MeatTrade < ApplicationRecord
    include LocationCountable
    belongs_to :location

    validates_presence_of :year

    scope :by_location, ->(location_id) { where(location_id: location_id) }
    scope :by_location_iso, ->(iso_code3) { joins(:location).where(locations: { iso_code3: iso_code3}) }
    scope :by_year, ->(year) { where(year: year) }

    def self.filter(params)
      trade = MeatTrade.all
      trade = trade.by_year(params[:year]) if params[:year]
      trade = trade.by_location(params[:location_id]) if params[:location_id]
      trade = trade.by_location_iso(params[:iso_code3]) if params[:iso_code3]
      trade
    end
  end
end
