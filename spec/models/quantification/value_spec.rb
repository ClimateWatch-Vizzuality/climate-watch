# == Schema Information
#
# Table name: quantification_values
#
#  id           :bigint           not null, primary key
#  location_id  :bigint
#  label_id     :bigint
#  year         :integer
#  first_value  :float
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  second_value :float
#
require 'rails_helper'

RSpec.describe Quantification::Value, type: :model do
  it 'should be invalid when label not present' do
    expect(
      FactoryBot.build(:quantification_value, label: nil)
    ).to have(1).errors_on(:label)
  end
end
