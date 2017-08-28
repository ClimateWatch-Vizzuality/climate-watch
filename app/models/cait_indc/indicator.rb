class CaitIndc::Indicator < ApplicationRecord
  belongs_to :chart, class_name: 'CaitIndc::Chart'
  belongs_to :indicator_type, class_name: 'CaitIndc::IndicatorType'
  belongs_to :category, class_name: 'CaitIndc::Category'
  has_many :indicator_values, class_name: 'CaitIndc::IndicatorValue'
  has_many :location_indicator_values, class_name: 'CaitIndc::LocationIndicatorValue'
  validates :name, presence: true
end
