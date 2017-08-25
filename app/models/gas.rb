class Gas < ApplicationRecord
  has_many :historical_emissions
  validates :name, presence: true
end
