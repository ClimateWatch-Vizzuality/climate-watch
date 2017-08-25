class AddTopojsonToLocation < ActiveRecord::Migration[5.1]
  def change
    add_column :locations, :topojson, :json
  end
end
