module CaitIndc
  class Category < ApplicationRecord
    has_and_belongs_to_many :indicators,
                            join_table: :cait_indc_indicators_categories
    validates :name, presence: true
    validates :category_type, inclusion: {in: %w(map overview)}
  end
end
