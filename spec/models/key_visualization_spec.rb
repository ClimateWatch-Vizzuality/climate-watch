# == Schema Information
#
# Table name: key_visualizations
#
#  id                 :bigint           not null, primary key
#  title              :string           not null
#  description        :text             not null
#  topic              :string           not null
#  embed_code         :text
#  image_download_url :text
#  data_download_url  :text
#  blog_link          :text
#  order              :integer          not null
#  geographies        :string           default([]), is an Array
#  tags               :string           default([]), is an Array
#  created_date       :date             not null
#  last_updated_date  :date             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  preview_image_url  :text
#  data_sources       :string           default([]), is an Array
#
require 'rails_helper'

RSpec.describe KeyVisualization, type: :model do
  subject { FactoryBot.build(:key_visualization) }

  it { is_expected.to be_valid }

  it 'should be invalid without title' do
    subject.title = nil
    expect(subject).to have(1).errors_on(:title)
  end

  it 'should be invalid without description' do
    subject.description = nil
    expect(subject).to have(1).errors_on(:description)
  end

  it 'should be invalid without topic' do
    subject.topic = nil
    expect(subject).to have(1).errors_on(:topic)
  end

  it 'should be invalid without created date' do
    subject.created_date = nil
    expect(subject).to have(1).errors_on(:created_date)
  end

  it 'should be invalid without last updated date' do
    subject.last_updated_date = nil
    expect(subject).to have(1).errors_on(:last_updated_date)
  end
end
