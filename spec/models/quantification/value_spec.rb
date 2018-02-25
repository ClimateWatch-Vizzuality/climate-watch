require 'rails_helper'

RSpec.describe Quantification::Value, type: :model do
  it 'should be invalid when label not present' do
    expect(
      FactoryBot.build(:quantification_value, label: nil)
    ).to have(1).errors_on(:label)
  end
end
