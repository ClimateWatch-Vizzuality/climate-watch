class CreateAgricultureProfileAreas < ActiveRecord::Migration[5.2]
  def change
    create_table :agriculture_profile_areas do |t|
      t.integer :year, null: false
      t.float :share_in_land_area_1
      t.float :share_in_land_area_2
      t.float :share_in_land_area_3
      t.float :share_in_land_area_4
      t.float :share_in_agricultural_area_1
      t.float :share_in_agricultural_area_2
      t.float :share_in_agricultural_area_3


      t.references :location,
                   foreign_key: {
                       on_delete: :cascade
                   }
    end
  end
end
