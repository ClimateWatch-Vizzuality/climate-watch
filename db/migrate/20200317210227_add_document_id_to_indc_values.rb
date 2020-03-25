class AddDocumentIdToIndcValues < ActiveRecord::Migration[5.2]
  def change
    add_reference :indc_values, :document, foreign_key: { to_table: :indc_documents }
  end
end
