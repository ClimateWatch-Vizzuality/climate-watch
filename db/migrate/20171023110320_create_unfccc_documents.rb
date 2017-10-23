class CreateUnfcccDocuments < ActiveRecord::Migration[5.1]
  def change
    create_table :unfccc_documents do |t|
      t.text :name
    end
  end
end
