FactoryGirl.define do
  factory :wri_metadata_value, class: 'WriMetadata::Value' do
    association :source, factory: :wri_metadata_source
    association :property, factory: :wri_metadata_property
    value 'MyText'
  end
end
