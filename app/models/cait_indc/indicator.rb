module CaitIndc
  class Indicator < ApplicationRecord
    belongs_to :chart, class_name: 'CaitIndc::Chart', optional: true
    has_and_belongs_to_many :categories,
                            join_table: :cait_indc_indicators_categories
    has_many :labels, class_name: 'CaitIndc::Label'
    has_many :values, class_name: 'CaitIndc::Value'

    validates :name, presence: true
  end
end
