module HistoricalEmissions
  class Gas < ApplicationRecord
    has_many :records, class_name: 'HistoricalEmissions::Record'
    validates :name, presence: true
  end
end
