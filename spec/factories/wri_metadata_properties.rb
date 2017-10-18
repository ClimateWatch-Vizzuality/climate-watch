FactoryGirl.define do
  factory :wri_metadata_property, class: 'WriMetadata::Property' do
    sequence :slug { |n| ('aaa'..'zzz').to_a[n] }
    name 'MyText'
  end
end

