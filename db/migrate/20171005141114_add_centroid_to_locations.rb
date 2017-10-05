class AddCentroidToLocations < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :centroid, :jsonb
  end
end
