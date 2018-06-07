module HistoricalEmissions
  class RecordPerYear < ApplicationRecord
    self.table_name = :historical_emissions_records_per_year
    self.primary_key = :id

    belongs_to :location
    belongs_to :data_source, class_name: 'HistoricalEmissions::DataSource'
    belongs_to :sector, class_name: 'HistoricalEmissions::Sector'
    belongs_to :gas, class_name: 'HistoricalEmissions::Gas'
    belongs_to :gwp, class_name: 'HistoricalEmissions::Gwp'

    def readonly?
      true
    end
  end
end
