module Adaptation
  class Value < ApplicationRecord
    belongs_to :variable, class_name: 'Adaptation::Variable'
    belongs_to :location
  end
end
