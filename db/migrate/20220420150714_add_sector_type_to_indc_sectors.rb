class AddSectorTypeToIndcSectors < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_sectors, :sector_type, :string
  end
end
