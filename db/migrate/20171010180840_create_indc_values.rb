class CreateIndcValues < ActiveRecord::Migration[5.0]
  def change
    create_view :indc_values, materialized: true
  end
end
