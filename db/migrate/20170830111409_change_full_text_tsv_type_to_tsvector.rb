class ChangeFullTextTsvTypeToTsvector < ActiveRecord::Migration[5.1]
  def up
    change_column :ndcs, :full_text_tsv, 'tsvector USING full_text_tsv::tsvector'
    add_index :ndcs, :full_text_tsv, using: :gin
  end

  def down
    change_column :ndcs, :full_text_tsv, :text
  end
end
