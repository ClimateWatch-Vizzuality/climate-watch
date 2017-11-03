module Indc
  class CategoryType < ApplicationRecord
    has_many :categories, class_name: 'Indc::Category'

    validates :name, uniqueness: true
    validates :name, presence: true
  end
end
