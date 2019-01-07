class AgricultureProfileCountryContexts < ActiveRecord::Migration[5.2]
  def change
    create_table :agriculture_profile_country_contexts do |t|
      t.integer :year, null: false
      t.float :employment_agri_female
      t.float :employment_agri_male
      t.float :employment_agri_total
      t.float :total_pesticides_use
      t.float :total_fertilizers
      t.float :water_withdrawal
      t.integer :water_withdrawal_rank
      t.float :value_added_agr

      t.references :location,
                   foreign_key: {
                       on_delete: :cascade
                   }
    end
  end
end
