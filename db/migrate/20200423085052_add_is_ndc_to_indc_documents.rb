class AddIsNdcToIndcDocuments < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_documents, :is_ndc, :boolean
  end
end
