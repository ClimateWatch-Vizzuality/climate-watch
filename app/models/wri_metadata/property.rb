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
module WriMetadata
  class Property < ApplicationRecord
    has_many :values, class_name: 'WriMetadata::Value'

    validates :slug, presence: true, uniqueness: true
    validates :name, presence: true
  end
end
