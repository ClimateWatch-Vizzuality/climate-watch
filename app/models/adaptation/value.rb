module Adaptation
  class Value < ApplicationRecord
    belongs_to :variable, class_name: 'Adaptation::Variable'
    belongs_to :location

    def value
      return number_value unless number_value.nil?
      return string_value unless string_value.nil?
      return boolean_value unless boolean_value.nil?
      nil
    end

    def number_value=(value)
      write_attribute(:number_value, Float(value))
    end
  end
end
