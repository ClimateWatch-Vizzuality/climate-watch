module Indc
  class Sector < ApplicationRecord
    self.primary_key = :id
    belongs_to :parent, class_name: 'Indc::Sector', optional: true
    has_many :values, class_name: 'Indc::Value'

    def readonly?
      true
    end
  end
end
