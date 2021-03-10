# == Schema Information
#
# Table name: timeline_sources
#
#  id   :bigint           not null, primary key
#  name :text
#
require 'rails_helper'

RSpec.describe Timeline::Source, type: :model do
  it 'should be invalid when name not present' do
    expect(
      FactoryBot.build(:timeline_source, name: nil)
    ).to have(1).errors_on(:name)
  end
end
