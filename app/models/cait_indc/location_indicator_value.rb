class CaitIndc::LocationIndicatorValue < ApplicationRecord
  belongs_to :location
  belongs_to :indicator, class_name: 'CaitIndc::Indicator'
  belongs_to :indicator_value, class_name: 'CaitIndc::IndicatorValue'
end
