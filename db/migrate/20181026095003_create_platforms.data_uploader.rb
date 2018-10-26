# This migration comes from data_uploader (originally 20180926092216)
class CreatePlatforms < ActiveRecord::Migration[5.2]
  def change
    create_table :platforms do |t|
      t.string :name
    end
  end
end
