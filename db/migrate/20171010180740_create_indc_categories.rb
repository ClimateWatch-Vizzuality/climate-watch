class CreateIndcCategories < ActiveRecord::Migration[5.0]
  def change
    create_view :indc_categories, materialized: true
  end
end
