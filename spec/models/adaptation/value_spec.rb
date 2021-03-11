# == Schema Information
#
# Table name: adaptation_values
#
#  id            :bigint           not null, primary key
#  variable_id   :bigint
#  location_id   :bigint
#  string_value  :text
#  number_value  :float
#  boolean_value :boolean
#  absolute_rank :integer
#  relative_rank :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  year          :integer
#
require 'rails_helper'

RSpec.describe Adaptation::Value, type: :model do
  it 'should be invalid when variable not present' do
    expect(
      FactoryBot.build(:adaptation_value, variable: nil)
    ).to have(1).errors_on(:variable)
  end

  it 'should be invalid when location not present' do
    expect(
      FactoryBot.build(:adaptation_value, location: nil)
    ).to have(1).errors_on(:location)
  end
end
