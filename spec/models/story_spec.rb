require 'rails_helper'

RSpec.describe Story, type: :model do
  describe '#tagged_stories' do
    it 'should return one story' do
      FactoryGirl.create(:story, tags:['NDC'])
      expect(Story.tagged_stories('NDC, esp, climate watch', 5)).to have(1).items
    end

    it 'should not return any story' do
      FactoryGirl.create(:story, tags:['OP23'])
      expect(Story.tagged_stories('NDC, esp', 5)).to have(0).items
    end
  end

  describe '#untagged_stories' do
    it 'should return no story' do
      FactoryGirl.create(:story)
      expect(Story.untagged_stories(0)).to have(0).items
    end

    it 'should return one story' do
      FactoryGirl.create(:story)
      expect(Story.untagged_stories(1)).to have(1).items
    end
  end
end