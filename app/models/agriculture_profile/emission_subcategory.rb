module AgricultureProfile
  class EmissionSubcategory < ApplicationRecord
    belongs_to :emission_category,
               class_name: 'AgricultureProfile::EmissionCategory',
               optional: true
  end
end
