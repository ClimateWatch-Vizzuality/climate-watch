class CreateIndcSectors < ActiveRecord::Migration[5.0]
  def change
    create_view :indc_sectors, materialized: true
  end
end
