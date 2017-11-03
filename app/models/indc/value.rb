module Indc
  class Value < ApplicationRecord
    belongs_to :location
    belongs_to :indicator, class_name: 'Indc::Indicator'
    belongs_to :label, class_name: 'Indc::Label', optional: true
    belongs_to :sector, class_name: 'Indc::Sector', optional: true

    validates :value, presence: true
  end
end
