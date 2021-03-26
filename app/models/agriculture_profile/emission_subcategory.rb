# == Schema Information
#
# Table name: agriculture_profile_emission_subcategories
#
#  id                   :bigint           not null, primary key
#  name                 :string
#  short_name           :string
#  indicator_name       :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  emission_category_id :bigint
#
module AgricultureProfile
  class EmissionSubcategory < ApplicationRecord
    belongs_to :emission_category,
               class_name: 'AgricultureProfile::EmissionCategory',
               optional: true
  end
end
