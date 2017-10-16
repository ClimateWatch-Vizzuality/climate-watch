module Indc
  class Sector < ApplicationRecord
    self.primary_key = :id
    belongs_to :parent, class_name: 'Indc::Sector', optional: true

    def readonly?
      true
    end
  end
end
