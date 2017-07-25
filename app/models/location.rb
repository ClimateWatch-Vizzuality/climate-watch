class Location < ApplicationRecord
  has_many :ndcs
  validates :code, presence: true
  validates :wri_standard_name, presence: true
end
