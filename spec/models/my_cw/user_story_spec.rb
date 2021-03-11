# == Schema Information
#
# Table name: user_stories
#
#  id         :bigint           not null, primary key
#  title      :string
#  body       :jsonb
#  public     :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
require 'rails_helper'

RSpec.describe MyCw::UserStory, type: :model do
  it 'should be invalid when no title is present' do
    expect(
      FactoryBot.build(:user_story, title: nil)
    ).to have(1).errors_on(:title)
  end

  it 'should be invalid when no user is present' do
    expect(
      FactoryBot.build(:user_story, user: nil)
    ).to have(1).errors_on(:user)
  end

  it 'should be valid when all is present' do
    expect(
      FactoryBot.build(:user_story)
    ).to be_valid
  end
end
