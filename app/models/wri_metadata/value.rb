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
module WriMetadata
  class Value < ApplicationRecord
    belongs_to :source, class_name: 'WriMetadata::Source'
    belongs_to :property, class_name: 'WriMetadata::Property'
  end
end
