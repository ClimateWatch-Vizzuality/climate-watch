class CreateIndcIndicatorsCategories < ActiveRecord::Migration[5.0]
  def change
    create_view :indc_indicators_categories, materialized: true
  end
end
