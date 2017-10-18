FactoryGirl.define do
  factory :wri_metadata_acronym, class: 'WriMetadata::Acronym' do
    sequence :acronym { |n| ('AAA'..'ZZZ').to_a[n] }
    definition 'MyText'
  end
end
