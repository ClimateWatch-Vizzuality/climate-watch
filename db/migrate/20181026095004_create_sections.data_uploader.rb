# This migration comes from data_uploader (originally 20180926092245)
class CreateSections < ActiveRecord::Migration[5.2]
  def change
    create_table :sections do |t|
      t.string :name
      t.references :platform, foreign_key: true
    end
  end
end
