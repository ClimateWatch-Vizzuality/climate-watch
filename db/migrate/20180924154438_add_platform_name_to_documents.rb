class AddPlatformNameToDocuments < ActiveRecord::Migration[5.2]
  def change
    add_column :documents, :platform_name, :string
  end
end
