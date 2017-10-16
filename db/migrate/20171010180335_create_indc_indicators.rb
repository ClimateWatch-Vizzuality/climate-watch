class CreateIndcIndicators < ActiveRecord::Migration[5.0]
  def change
    create_view :indc_indicators, materialized: true
  end
end
