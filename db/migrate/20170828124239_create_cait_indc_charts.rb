class CreateCaitIndcCharts < ActiveRecord::Migration[5.1]
  def change
    create_table :cait_indc_charts do |t|
      t.text :name, null: false
    end
  end
end
