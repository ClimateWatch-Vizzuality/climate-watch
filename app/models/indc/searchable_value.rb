# == Schema Information
#
# Table name: indc_searchable_values
#
#  id                      :bigint
#  source_id               :bigint
#  source                  :text
#  iso_code3               :text
#  country                 :text
#  global_categories_ids   :integer          is an Array
#  global_category         :text
#  overview_categories_ids :integer          is an Array
#  overview_category       :text
#  sector_id               :bigint
#  sector                  :text
#  subsector               :text
#  indicator_id            :bigint
#  indicator_slug          :text
#  indicator_name          :text
#  value                   :text
#
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
