module Indc
  class Label < ApplicationRecord
    belongs_to :indicator, class_name: 'Indc::Indicator'
    has_many :indc_values, class_name: 'Indc::Value'

    validates :value, presence: true
    validates :index, presence: true
  end
end
