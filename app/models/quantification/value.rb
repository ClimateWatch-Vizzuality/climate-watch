module Quantification
  class Value < ApplicationRecord
    belongs_to :label, class_name: 'Quantification::Label'
    belongs_to :location

    validates :year, presence: true
  end
end
