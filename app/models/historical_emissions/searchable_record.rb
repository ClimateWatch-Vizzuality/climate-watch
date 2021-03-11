# == Schema Information
#
# Table name: historical_emissions_searchable_records
#
#  id             :bigint
#  data_source_id :bigint
#  data_source    :text
#  location_id    :bigint
#  iso_code3      :text
#  region         :text
#  sector_id      :bigint
#  sector         :text
#  gas_id         :bigint
#  gas            :text
#  emissions      :jsonb
#  emissions_dict :jsonb
#
module HistoricalEmissions
  class SearchableRecord < ApplicationRecord
    self.table_name = 'historical_emissions_searchable_records'

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
      Scenic.database.refresh_materialized_view(
        :historical_emissions_records_emissions, concurrently: false
      )
      Scenic.database.refresh_materialized_view(table_name, concurrently: false)
    end
  end
end
