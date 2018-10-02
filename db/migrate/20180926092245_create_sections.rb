class CreateSections < ActiveRecord::Migration[5.2]
  def change
    create_table :sections do |t|
      t.string :name
      t.references :platform, foreign_key: true
    end
  end
end
