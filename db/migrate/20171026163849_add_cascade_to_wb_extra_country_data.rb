class AddCascadeToWbExtraCountryData < ActiveRecord::Migration[5.1]
  def change
    add_cascade_to_foreign_key :wb_extra_country_data, :locations, :location_id
  end

  def add_cascade_to_foreign_key from, to, column_name
    reversible do |dir|
      dir.up do
        remove_foreign_key from, to
        add_foreign_key from, to, column: column_name, on_delete: :cascade
      end

      dir.down do
        remove_foreign_key from, to
        add_foreign_key from, to, column: column_name
      end
    end
  end
end
