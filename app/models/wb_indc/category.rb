module WbIndc
  class Category < ApplicationRecord
    has_and_belongs_to_many :indicators,
                            join_table: :wb_indc_indicators_categories
    validates :name, presence: true
  end
end
