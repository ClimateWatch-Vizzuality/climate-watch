module Quantification
  class Label < ApplicationRecord
    validates :name, presence: true, uniqueness: true
  end
end
