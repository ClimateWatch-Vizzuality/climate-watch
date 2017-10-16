module Adaptation
  class Variable < ApplicationRecord
    has_many :values, class_name: 'Adaptation::Value'
    validates :slug, presence: true
    validates :name, presence: true
  end
end
