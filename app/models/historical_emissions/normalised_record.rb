# == Schema Information
#
# Table name: historical_emissions_normalised_records
#
#  id             :bigint
#  data_source_id :bigint
#  location_id    :bigint
#  sector_id      :bigint
#  gas_id         :bigint
#  year           :integer
#  value          :text
#
module HistoricalEmissions
  class NormalisedRecord < ApplicationRecord
    self.table_name = 'historical_emissions_normalised_records'

    belongs_to :record,
               class_name: 'HistoricalEmissions::Record',
               foreign_key: :id
    belongs_to :location
    belongs_to :data_source, class_name: 'HistoricalEmissions::DataSource'
    belongs_to :sector, class_name: 'HistoricalEmissions::Sector'
    belongs_to :gas, class_name: 'HistoricalEmissions::Gas'
    belongs_to :gwp, class_name: 'HistoricalEmissions::Gwp'

    def readonly?
      true
    end

    def self.refresh
      Scenic.database.refresh_materialized_view(table_name, concurrently: false)
    end
  end
end
