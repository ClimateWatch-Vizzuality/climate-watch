module HistoricalEmissions
  class Sector < ApplicationRecord
    belongs_to :data_source, class_name: 'HistoricalEmissions::DataSource'
    belongs_to :parent, class_name: 'HistoricalEmissions::Sector',
                        foreign_key: 'parent_id',
                        required: false
    has_many :records, class_name: 'HistoricalEmissions::Record'

    has_and_belongs_to_many :aggregated_sectors,
                            class_name: 'HistoricalEmissions::Sector',
                            join_table: :historical_emissions_sector_aggregations,
                            foreign_key: :sector_id,
                            association_foreign_key: :aggregated_sector_id

    has_and_belongs_to_many :aggregated_by,
                            class_name: 'HistoricalEmissions::Sector',
                            join_table: :historical_emissions_sector_aggregations,
                            foreign_key: :aggregated_sector_id,
                            association_foreign_key: :sector_id

    validates :name, presence: true

    def self.first_and_second_level
      joins('LEFT JOIN historical_emissions_sectors parents ON historical_emissions_sectors.parent_id = parents.id').
        where('
          parents.parent_id IS NULL OR
          historical_emissions_sectors.parent_id IS NULL
        ')
    end
  end
end
