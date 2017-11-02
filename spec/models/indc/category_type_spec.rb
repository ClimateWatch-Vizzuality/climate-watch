require 'rails_helper'

RSpec.describe Indc::CategoryType, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:indc_category_type, name: nil)
    ).to have(1).errors_on(:name)
  end
end
