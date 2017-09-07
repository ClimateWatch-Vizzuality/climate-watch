module CaitIndc
  class Value < ApplicationRecord
    belongs_to :location
    belongs_to :indicator, class_name: 'CaitIndc::Indicator'
    belongs_to :label, class_name: 'CaitIndc::Label', optional: true
  end
end
