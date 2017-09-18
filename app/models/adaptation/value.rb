module Adaptation
  class Value < ApplicationRecord
    belongs_to :variable, class_name: 'Adaptation::Variable'
    belongs_to :location

    def value
      return self.number_value unless self.number_value.nil?
      return self.string_value unless self.string_value.nil?
      return self.boolean_value unless self.boolean_value.nil?
      nil
    end
  end
end
