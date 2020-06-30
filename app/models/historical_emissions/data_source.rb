require_dependency 'historical_emissions'

module HistoricalEmissions
  class DataSource < ApplicationRecord
    has_many :sectors, class_name: 'HistoricalEmissions::Sector'
    has_many :records, class_name: 'HistoricalEmissions::Record'
    validates :name, presence: true
  end
end
