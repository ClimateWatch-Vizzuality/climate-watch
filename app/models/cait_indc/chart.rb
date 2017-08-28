class CaitIndc::Chart < ApplicationRecord
  has_many :indicators, class_name: 'CaitIndc::Indicator'
  validates :name, presence: true
end
