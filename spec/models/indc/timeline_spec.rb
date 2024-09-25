# == Schema Information
#
# Table name: indc_timelines
#
#  id          :bigint           not null, primary key
#  location_id :bigint           not null
#  submission  :string
#  date        :date
#  url         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

describe Indc::Timeline, type: :model do
  it 'should be invalid when location not present' do
    expect(
      FactoryBot.build(:indc_timeline, location: nil)
    ).to have(1).errors_on(:location)
  end

  describe '#date=' do
    it 'should parse date' do
      timeline = FactoryBot.build(:indc_timeline, date: '11/3/24')
      expect(timeline.date.to_s).to eq Date.new(2024, 11, 3).to_s
    end

    it 'should accept date as Date' do
      date = Date.new(2024, 11, 3)
      timeline = FactoryBot.build(:indc_timeline, date: date)
      expect(timeline.date.to_s).to eq(date.to_s)
    end
  end
end
