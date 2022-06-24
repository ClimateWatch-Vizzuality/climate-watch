# == Schema Information
#
# Table name: indc_sectors
#
#  id          :bigint           not null, primary key
#  parent_id   :bigint
#  name        :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  sector_type :string
#
require 'rails_helper'

describe Indc::Sector, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:indc_sector, name: nil)
    ).to have(1).errors_on(:name)
  end
end
