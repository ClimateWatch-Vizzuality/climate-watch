class CreateCaitIndcIndicatorTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_indicator_types do |t|
      t.text :name, null: false
    end
  end
end
