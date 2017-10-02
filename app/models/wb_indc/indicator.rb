module WbIndc
  class Indicator < ApplicationRecord
    belongs_to :indicator_type, class_name: 'WbIndc::IndicatorType'
    has_and_belongs_to_many :categories,
                            join_table: :wb_indc_indicators_categories
    validates :name, presence: true
    validates :code, presence: true
  end
end
