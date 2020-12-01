class AddDataSourcesToKeyVisualizations < ActiveRecord::Migration[5.2]
  def change
    add_column :key_visualizations, :data_sources, :string, array: true, default: []
  end
end
