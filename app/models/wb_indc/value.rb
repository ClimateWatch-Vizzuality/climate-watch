module WbIndc
  class Value < ApplicationRecord
    belongs_to :location
    belongs_to :sector, class_name: 'WbIndc::Sector', optional: true
    belongs_to :indicator, class_name: 'WbIndc::Indicator'
  end
end
