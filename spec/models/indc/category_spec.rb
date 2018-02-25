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
