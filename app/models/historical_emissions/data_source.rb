require_dependency 'historical_emissions'

module HistoricalEmissions
  class DataSource < ApplicationRecord
    has_many :sectors, class_name: 'HistoricalEmissions::Sector'
    validates :name, presence: true
  end
end
