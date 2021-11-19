class CreateCountryProfileIndicators < ActiveRecord::Migration[5.2]
  def change
    create_table :country_profile_indicators do |t|
      t.string :slug, null: false, index: { unique: true }
      t.string :name
      t.string :short_name
      t.string :metadata_source
      t.string :file

      t.timestamps
    end
  end
end
