module Indc
  class CategoryType < ApplicationRecord
    GLOBAL = 'global'.freeze
    OVERVIEW = 'overview'.freeze
    MAP = 'map'.freeze

    has_many :categories, class_name: 'Indc::Category'

    validates :name, uniqueness: true
    validates :name, presence: true
  end
end
