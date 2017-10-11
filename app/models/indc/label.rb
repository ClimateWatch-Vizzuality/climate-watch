module Indc
  class Label < ApplicationRecord
    self.primary_key = :id
    belongs_to :indicator, class_name: 'Indc::Indicator'

    def readonly?
      true
    end
  end
end
