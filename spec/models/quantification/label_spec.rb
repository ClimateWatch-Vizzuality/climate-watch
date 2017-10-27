require 'rails_helper'

RSpec.describe Quantification::Label, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryGirl.build(:quantification_label, name: nil)
    ).to have(1).errors_on(:name)
  end
end
