module Indc
  class Value < ApplicationRecord
    self.primary_key = :id
    belongs_to :location
    belongs_to :indicator, class_name: 'Indc::Indicator'
    belongs_to :label, class_name: 'Indc::Label', optional: true

    def readonly?
      true
    end
  end
end
