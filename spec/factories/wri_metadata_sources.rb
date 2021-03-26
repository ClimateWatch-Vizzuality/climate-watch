# == Schema Information
#
# Table name: wri_metadata_sources
#
#  id         :bigint           not null, primary key
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :wri_metadata_source, class: 'WriMetadata::Source' do
    name { 'MyText' }
  end
end
