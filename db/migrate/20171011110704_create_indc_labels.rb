class CreateIndcLabels < ActiveRecord::Migration[5.0]
  def change
    create_view :indc_labels, materialized: true
  end
end
