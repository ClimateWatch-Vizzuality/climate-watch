module CaitIndc
  class Label < ApplicationRecord
    belongs_to :indicator, class_name: 'CaitIndc::Indicator'
    validates :name, presence: true
  end
end
