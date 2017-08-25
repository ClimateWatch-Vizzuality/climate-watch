require 'rails_helper'

RSpec.describe DataSource, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:data_source, name: nil)
    ).to have(1).errors_on(:name)
  end
end
