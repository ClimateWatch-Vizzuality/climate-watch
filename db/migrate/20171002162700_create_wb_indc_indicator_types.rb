class CreateWbIndcIndicatorTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :wb_indc_indicator_types do |t|
      t.text :name, null: false
      t.timestamps
    end
  end
end
