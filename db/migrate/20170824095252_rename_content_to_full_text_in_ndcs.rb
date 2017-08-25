class RenameContentToFullTextInNdcs < ActiveRecord::Migration[5.1]
  def change
    rename_column :ndcs, :content, :full_text
    rename_column :ndcs, :content_tsv, :full_text_tsv
  end
end
