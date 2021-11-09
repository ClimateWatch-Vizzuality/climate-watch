class CreateCountryProfileIndicators < ActiveRecord::Migration[5.2]
  def change
    create_table :country_profile_indicators do |t|
      t.string :slug, null: false, index: { unique: true }
      t.string :name

      t.timestamps
    end
  end
end
