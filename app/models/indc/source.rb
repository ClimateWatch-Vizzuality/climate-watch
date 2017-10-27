module Indc
  class Source < ApplicationRecord
    validate :name, presence: true
    validate :name, uniqueness: true
  end
end
