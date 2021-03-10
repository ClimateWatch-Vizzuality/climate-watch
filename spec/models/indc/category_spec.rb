# == Schema Information
#
# Table name: indc_categories
#
#  id               :bigint           not null, primary key
#  category_type_id :bigint           not null
#  parent_id        :bigint
#  slug             :text             not null
#  name             :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  order            :integer
#
require 'rails_helper'

RSpec.describe Indc::Category, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:indc_category, name: nil)
    ).to have(1).errors_on(:name)
  end

  it 'should be invalid when slug not present' do
    expect(
      FactoryBot.build(:indc_category, slug: nil)
    ).to have(1).errors_on(:slug)
  end
end
