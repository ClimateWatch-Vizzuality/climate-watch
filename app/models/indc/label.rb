module Indc
  class Label < ApplicationRecord
    belongs_to :indicator, class_name: 'Indc::Indicator'

    validates :value, presence: true
    validates :index, presence: true
  end
end
