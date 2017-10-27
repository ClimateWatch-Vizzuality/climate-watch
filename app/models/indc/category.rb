module Indc
  class Category < ApplicationRecord
    belongs_to :source, class_name: 'Indc::Source'
    belongs_to :category_type, class_name: 'Indc::CategoryType'
    has_and_belongs_to_many :indicators,
                            join_table: :indc_indicators_categories

    validates :slug, presence: true
    validates :name, presence: true
    validates :slug, uniqueness: true
  end
end
