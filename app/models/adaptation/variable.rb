module Adaptation
  class Variable < ApplicationRecord
    has_many :values, class_name: 'Adaptation::Value'
    validates :slug, presence: true
    validates :name, presence: true

    def maximum
      Value.where(variable_id: id).maximum(:absolute_rank)
    end
  end
end
