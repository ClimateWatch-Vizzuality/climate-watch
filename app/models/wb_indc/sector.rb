module WbIndc
  class Sector < ApplicationRecord
    belongs_to :parent, class_name: 'WbIndc::Sector', optional: true
    validates :name, presence: true
  end
end
