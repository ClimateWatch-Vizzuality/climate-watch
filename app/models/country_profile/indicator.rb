module CountryProfile
  class Indicator < ApplicationRecord
    has_many :values, class_name: 'CountryProfile::Value'

    validates :slug, presence: true
  end
end
