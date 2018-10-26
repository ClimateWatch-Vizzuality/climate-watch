# This migration comes from data_uploader (originally 20180926092304)
class CreateDatasets < ActiveRecord::Migration[5.2]
  def change
    create_table :datasets do |t|
      t.string :name
      t.references :section, foreign_key: true
    end
  end
end
