# == Schema Information
#
# Table name: wri_metadata_acronyms
#
#  id         :bigint           not null, primary key
#  acronym    :text
#  definition :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :wri_metadata_acronym, class: 'WriMetadata::Acronym' do
    sequence(:acronym) { |n| ('AAA'..'ZZZ').to_a[n] }
    definition { 'MyText' }
  end
end
