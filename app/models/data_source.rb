class DataSource < ApplicationRecord
  has_many :sectors
  validates :name, presence: true
end
