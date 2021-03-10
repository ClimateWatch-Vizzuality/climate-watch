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
require 'rails_helper'

RSpec.describe AgricultureProfile::MeatTrade, type: :model do
  it 'should be invalid without location' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_trade, location: nil)
    ).to have(1).errors_on(:location)
  end

  it 'should be invalid without year' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_trade, year: nil)
    ).to have(1).errors_on(:year)
  end

  it 'should be valid' do
    expect(
      FactoryBot.build(:agriculture_profile_meat_trade)
    ).to be_valid
  end
end
