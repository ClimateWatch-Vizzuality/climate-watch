# == Schema Information
#
# Table name: wri_metadata_values
#
#  id          :bigint           not null, primary key
#  source_id   :bigint
#  property_id :bigint
#  value       :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :wri_metadata_value, class: 'WriMetadata::Value' do
    association :source, factory: :wri_metadata_source
    association :property, factory: :wri_metadata_property
    value { 'MyText' }
  end
end
