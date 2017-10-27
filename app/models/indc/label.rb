module Indc
  class Label < ApplicationRecord
    belongs_to :indicator, class_name: 'Indc::Indicator'

    validates :name, presence: true
    validates :index, presence: true
  end
end
