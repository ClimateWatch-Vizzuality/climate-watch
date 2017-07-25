class Location < ApplicationRecord
  validates :code, presence: true
  validates :wri_standard_name, presence: true
end
