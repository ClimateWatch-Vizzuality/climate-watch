# == Schema Information
#
# Table name: adaptation_variables
#
#  id         :bigint           not null, primary key
#  slug       :text
#  name       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
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
