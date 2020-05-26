class AddDocumentIdToIndcSubmissions < ActiveRecord::Migration[5.2]
  def change
    add_reference :indc_submissions, :document, foreign_key: { to_table: :indc_documents }
  end
end
