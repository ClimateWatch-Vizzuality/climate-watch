require 'rails_helper'

RSpec.describe Story, type: :model do
  before(:each) do
    FactoryGirl.create(:story, tags: %w[NDC])
    FactoryGirl.create(:story, tags: %w[NDC esp])
    FactoryGirl.create(:story, tags: %w[OP23])
    FactoryGirl.create(:story, tags: %w[OP])
    FactoryGirl.create(:story, tags: nil)
  end
  describe '#tagged_stories' do
    it 'should return two stories' do
      expect(Story.tagged_stories(['NDC', 'esp', 'climate watch'], 5)).to have(2).items
    end
  end

  describe '#untagged_stories' do
    it 'should return 2 stories' do
      expect(Story.not_tagged_by(['NDC', 'esp', 'climate watch'], 5)).to have(3).items
    end
  end

  describe '#stories_filter' do
    it 'should return 5 stories' do
      expect(Story.stories_filter('NDC, esp, climate watch', 5)).to have(5).items
    end
  end
end
