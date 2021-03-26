# == Schema Information
#
# Table name: notifications
#
#  id          :bigint           not null, primary key
#  description :text             not null
#  date        :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Notification, type: :model do
  subject { build(:notification) }

  it { is_expected.to be_valid }

  it 'should be invalid without description' do
    subject.description = nil
    expect(subject).to have(1).errors_on(:description)
  end

  it 'should be invalid without date' do
    subject.date = nil
    expect(subject).to have(1).errors_on(:date)
  end
end
