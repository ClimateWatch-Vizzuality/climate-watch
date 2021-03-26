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
module WriMetadata
  class Acronym < ApplicationRecord
    validates :acronym, presence: true, uniqueness: true
    validates :definition, presence: true
  end
end
