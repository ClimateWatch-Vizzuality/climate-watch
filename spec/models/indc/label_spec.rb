# == Schema Information
#
# Table name: indc_labels
#
#  id           :bigint           not null, primary key
#  indicator_id :bigint           not null
#  value        :text             not null
#  index        :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  slug         :string
#
require 'rails_helper'

RSpec.describe Indc::Label, type: :model do
  it 'should be invalid when indicator not present' do
    expect(
      FactoryBot.build(:indc_label, indicator: nil)
    ).to have(1).errors_on(:indicator)
  end

  it 'should be invalid when value not present' do
    expect(
      FactoryBot.build(:indc_label, value: nil)
    ).to have(1).errors_on(:value)
  end

  it 'should be invalid when index not present' do
    expect(
      FactoryBot.build(:indc_label, index: nil)
    ).to have(1).errors_on(:index)
  end
end
