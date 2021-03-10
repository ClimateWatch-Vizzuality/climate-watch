# == Schema Information
#
# Table name: wri_metadata_sources
#
#  id         :bigint           not null, primary key
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module WriMetadata
  class Source < ApplicationRecord
    has_many :values, class_name: 'WriMetadata::Value'

    validates :name, presence: true

    def value_by_property(property)
      values.
        find do |v|
          v.property.slug == property.to_s
        end
    end
  end
end
