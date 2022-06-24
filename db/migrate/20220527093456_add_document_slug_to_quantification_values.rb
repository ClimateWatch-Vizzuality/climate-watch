class AddDocumentSlugToQuantificationValues < ActiveRecord::Migration[5.2]
  def change
    add_column :quantification_values, :document_slug, :string
  end
end
