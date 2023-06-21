# == Schema Information
#
# Table name: stories
#
#  id                   :bigint           not null, primary key
#  title                :string
#  description          :text
#  published_at         :datetime
#  background_image_url :string
#  link                 :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  tags                 :string           default([]), is an Array
#
require 'rails_helper'

RSpec.describe Story, type: :model do
  before(:each) do
    FactoryBot.create(:story, tags: %w[NDC])
    FactoryBot.create(:story, tags: %w[NDC esp mapping])
    FactoryBot.create(:story, tags: %w[OP23])
    FactoryBot.create(:story, tags: %w[climatewatch-pinned])
    FactoryBot.create(:story, tags: %w[climatewatch-pinned esp])
    FactoryBot.create(:story, tags: %w[OP])
    FactoryBot.create(:story, tags: nil)
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
      pinned = Story.tagged_stories(['climatewatch-pinned'], 1)
      tagged = Story.tagged_stories(['NDC', 'esp', 'climate watch'], 5)
      expect((pinned + tagged)).to have(4).items
    end
  end

  describe '#stories_filter' do
    it 'should return five stories' do
      expect(Story.stories_filter('NDC, esp, climate watch', 5)).to have(5).items
    end
  end

  describe '#resized_background_image_url' do
    context 'when background image comes from WRI' do
      let(:story) { FactoryBot.create(:story, background_image_url: 'https://files.wri.org/d8/s3fs-public/2023-03/ipcc-flooding_0.jpg') }

      it 'should return resized background image url' do
        expect(story.resized_background_image_url).to include('https://files.wri.org/d8/s3fs-public/styles/500x300/s3/2023-03/ipcc-flooding_0.jpg')
      end
    end

    context 'when background image does not come from WRI' do
      let(:story) { FactoryBot.create(:story, background_image_url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png') }

      it 'should return resized background image url' do
        expect(story.resized_background_image_url).to eq('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png')
      end
    end
  end
end
