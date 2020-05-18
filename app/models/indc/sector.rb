module Indc
  class Sector < ApplicationRecord
    belongs_to :parent, class_name: 'Indc::Sector', optional: true
    has_many :children, class_name: 'Indc::Sector', foreign_key: :parent_id

    has_many :values, class_name: 'Indc::Value'

    validates :name, presence: true
  end
end
