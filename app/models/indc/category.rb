module Indc
  class Category < ApplicationRecord
    self.primary_key = :id

    has_and_belongs_to_many :indicators,
                            join_table: :indc_indicators_categories

    def readonly?
      true
    end
  end
end
