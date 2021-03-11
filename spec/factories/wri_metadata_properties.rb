# == Schema Information
#
# Table name: wri_metadata_properties
#
#  id         :bigint           not null, primary key
#  slug       :text
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :wri_metadata_property, class: 'WriMetadata::Property' do
    sequence(:slug) { |n| ('aaa'..'zzz').to_a[n] }
    name { 'MyText' }
  end
end
