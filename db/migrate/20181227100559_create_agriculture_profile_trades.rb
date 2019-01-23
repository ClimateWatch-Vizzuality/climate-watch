class CreateAgricultureProfileTrades < ActiveRecord::Migration[5.2]
  def change
    create_table :agriculture_profile_meat_trades do |t|
      t.integer :year, null: false
      t.integer :trade_import_1
      t.integer :trade_import_2
      t.integer :trade_import_3
      t.integer :trade_import_4
      t.integer :trade_import_5
      t.integer :trade_import_6
      t.integer :trade_import_7
      t.integer :trade_import_8
      t.integer :trade_export_1
      t.integer :trade_export_2
      t.integer :trade_export_3
      t.integer :trade_export_4
      t.integer :trade_export_5
      t.integer :trade_export_6
      t.integer :trade_export_7
      t.integer :trade_export_8

      t.references :location,
                   foreign_key: {
                       on_delete: :cascade
                   }
    end

    create_table :agriculture_profile_meat_consumptions do |t|
      t.integer :year, null: false
      t.float :meat_consumption_1
      t.float :meat_consumption_2
      t.float :meat_consumption_3
      t.float :meat_consumption_4
      t.float :meat_consumption_per_capita_1
      t.float :meat_consumption_per_capita_2
      t.float :meat_consumption_per_capita_3
      t.float :meat_consumption_per_capita_4

      t.references :location,
                   foreign_key: {
                       on_delete: :cascade
                   }
    end

    create_table :agriculture_profile_meat_productions do |t|
      t.integer :year, null: false
      t.integer :production_agr_1
      t.integer :production_agr_2
      t.integer :production_agr_3
      t.integer :production_agr_4
      t.integer :production_agr_5
      t.integer :production_agr_6
      t.integer :production_agr_7
      t.integer :production_agr_8
      t.integer :production_agr_9
      t.integer :production_agr_10


      t.references :location,
                   foreign_key: {
                       on_delete: :cascade
                   }
    end
  end
end
