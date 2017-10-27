module Quantification
  class Label < ApplicationRecord
    validates :name, presence: true
  end
end
