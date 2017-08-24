class Sector < ApplicationRecord
  belongs_to :data_source
  belongs_to :parent, class_name: 'Sector',
                      foreign_key: 'parent_id',
                      required: false
  has_many :historical_emissions
  validates :name, presence: true
end
