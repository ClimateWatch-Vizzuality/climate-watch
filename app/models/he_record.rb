class HeRecord < ApplicationRecord
  belongs_to :location
  belongs_to :he_sector
  belongs_to :he_gas
  validates :year, presence: true
  validates :value, presence: true
end
