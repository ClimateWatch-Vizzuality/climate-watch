module CountryProfile
  class Value < ApplicationRecord
    belongs_to :location
    belongs_to :indicator, class_name: 'CountryProfile::Indicator'

    validates :value, presence: true
  end
end
