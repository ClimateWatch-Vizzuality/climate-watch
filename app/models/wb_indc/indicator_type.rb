module WbIndc
  class IndicatorType < ApplicationRecord
    has_many :indicators, class_name: 'WbIndc::Indicator'
    validates :name, presence: true
  end
end
