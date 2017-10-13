module Indc
  class Indicator < ApplicationRecord
    self.primary_key = :id

    has_many :values, class_name: 'Indc::Value'
    has_many :labels, class_name: 'Indc::Label'
    has_and_belongs_to_many :categories,
                            join_table: :indc_indicators_categories

    def readonly?
      true
    end
  end
end
