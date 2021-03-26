# == Schema Information
#
# Table name: indc_indicators
#
#  id                :bigint           not null, primary key
#  source_id         :bigint           not null
#  slug              :text             not null
#  name              :text             not null
#  description       :text
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  order             :integer
#  multiple_versions :boolean
#  normalized_slug   :string
#  normalized_label  :string
#
require 'rails_helper'

describe Indc::Indicator, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:indc_indicator, name: nil)
    ).to have(1).errors_on(:name)
  end

  it 'should be invalid when slug not present' do
    expect(
      FactoryBot.build(:indc_indicator, slug: nil)
    ).to have(1).errors_on(:slug)
  end

  it 'should be invalid when source not present' do
    expect(
      FactoryBot.build(:indc_indicator, source: nil)
    ).to have(1).errors_on(:source)
  end

  it 'should be able to create indicator with all dependant records' do
    expect(
      FactoryBot.build(:indc_indicator, :with_dependants)
    ).to be_valid
  end
end
