class DropOldIndcTablesAndViews < ActiveRecord::Migration[5.1]
  def change
    drop_view :indc_values, materialized: true
    drop_view :indc_sectors, materialized: true
    drop_view :indc_labels, materialized: true
    drop_view :indc_indicators_categories, materialized: true
    drop_view :indc_indicators, materialized: true
    drop_view :indc_categories, materialized: true

    drop_table :global_indc_indicators_categories
    drop_table :global_indc_categories
    drop_table :global_indc_indicators

    drop_table :cait_indc_values
    drop_table :cait_indc_labels
    drop_table :cait_indc_indicators_categories
    drop_table :cait_indc_categories
    drop_table :cait_indc_indicators
    drop_table :cait_indc_submissions
    drop_table :cait_indc_charts

    drop_table :wb_indc_values
    drop_table :wb_indc_indicators_categories
    drop_table :wb_indc_categories
    drop_table :wb_indc_indicators
    drop_table :wb_indc_indicator_types
    drop_table :wb_indc_sectors
  end
end
