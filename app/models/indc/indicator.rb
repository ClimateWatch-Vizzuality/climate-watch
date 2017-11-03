module Indc
  class Indicator < ApplicationRecord
    belongs_to :source, class_name: 'Indc::Source'
    has_many :values, class_name: 'Indc::Value'
    has_many :labels, class_name: 'Indc::Label'
    has_and_belongs_to_many :categories,
                            join_table: :indc_indicators_categories

    validates :slug, presence: true
    validates :name, presence: true
    validates :slug, uniqueness: true
  end
end
