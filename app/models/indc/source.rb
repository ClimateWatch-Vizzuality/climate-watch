module Indc
  class Source < ApplicationRecord
    validates :name, presence: true
    validates :name, uniqueness: true
  end
end
