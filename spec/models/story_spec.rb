require 'rails_helper'

RSpec.describe Story, type: :model do
  before(:each) do
    FactoryGirl.create(:story, tags: %w[NDC])
    FactoryGirl.create(:story, tags: %w[NDC esp mapping])
    FactoryGirl.create(:story, tags: %w[OP23])
    FactoryGirl.create(:story, tags: %w[climatewatch-pinned])
    FactoryGirl.create(:story, tags: %w[climatewatch-pinned esp])
    FactoryGirl.create(:story, tags: %w[OP])
    FactoryGirl.create(:story, tags: nil)
  end

  describe '#pinned_stories' do
    it 'should return one story' do
      expect(Story.pinned_stories(1)).to have(1).items
    end
  end

  describe '#pinned_stories' do
    it 'should return two story' do
      expect(Story.pinned_stories(2)).to have(2).items
    end
  end

  describe '#tagged_stories' do
    it 'should return three stories' do
      expect(Story.tagged_stories(['NDC', 'esp', 'climate watch'], 5)).to have(3).items
    end
  end

  describe '#untagged_stories' do
    it 'should return four stories' do
      expect(Story.not_tagged_by(['NDC', 'esp', 'climate watch'], 5)).to have(4).items
    end
  end

  describe '#pinned_stories plus tagged_stories' do
    it 'should return four stories' do
      pinned = Story.pinned_stories(1)
      tagged = Story.tagged_stories(['NDC', 'esp', 'climate watch'], 5)
      expect((pinned + tagged).uniq).to have(4).items
    end
  end

  describe '#stories_filter' do
    it 'should return five stories' do
      expect(Story.stories_filter('NDC, esp, climate watch', 5)).to have(5).items
    end
  end
end
