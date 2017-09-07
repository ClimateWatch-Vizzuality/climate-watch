class CreateCaitIndcLocationData < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_location_data do |t|
      t.references :location, foreign_key: {on_delete: :cascade}
      t.boolean :highlight_outline, null: false, default: false
      t.decimal :marker_lat
      t.decimal :marker_lng
      t.jsonb :data, null: false, default: nil
    end
  end
end
