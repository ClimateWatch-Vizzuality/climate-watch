module CaitIndc
  class Indicator < ApplicationRecord
    belongs_to :chart, class_name: 'CaitIndc::Chart', optional: true
    belongs_to :category, class_name: 'CaitIndc::Category', optional: true
    has_many :labels, class_name: 'CaitIndc::Label'
    has_many :values, class_name: 'CaitIndc::Value'

    validates :name, presence: true
  end
end
