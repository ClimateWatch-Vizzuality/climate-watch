# == Schema Information
#
# Table name: indc_sources
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

describe Indc::Source, type: :model do
  subject { FactoryBot.build(:indc_source) }

  it { is_expected.to be_valid }

  it 'should be invalid when name not present' do
    subject.name = nil
    expect(subject).to have(1).errors_on(:name)
  end

  it 'should be invalid with wrong name' do
    subject.name = 'source'
    expect(subject).to have(1).errors_on(:name)
  end
end
