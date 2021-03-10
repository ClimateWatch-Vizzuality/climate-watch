# == Schema Information
#
# Table name: indc_sources
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

describe Indc::Source, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:indc_source, name: nil)
    ).to have(1).errors_on(:name)
  end
end
