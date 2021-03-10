# == Schema Information
#
# Table name: agriculture_profile_emission_categories
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  unit       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module AgricultureProfile
  class EmissionCategory < ApplicationRecord
    validates_presence_of :name
    validates_presence_of :unit
  end
end
