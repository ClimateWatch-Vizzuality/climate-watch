class CaitIndc::Value < ApplicationRecord
  belongs_to :location
  belongs_to :indicator, class_name: 'CaitIndc::Indicator'
  belongs_to :indicator_label, class_name: 'CaitIndc::IndicatorLabel', optional: true
end
