module Indc
  class SearchableValue < ApplicationRecord
    self.table_name = 'indc_searchable_values'

    def readonly?
      true
    end

    def self.refresh
      Scenic.database.refresh_materialized_view(table_name, concurrently: false)
    end
  end
end
