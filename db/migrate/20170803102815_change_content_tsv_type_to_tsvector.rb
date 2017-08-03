class ChangeContentTsvTypeToTsvector < ActiveRecord::Migration[5.1]
  def up
    change_column :ndcs, :content_tsv, 'tsvector USING content_tsv::tsvector'
    add_index :ndcs, :content_tsv, using: :gin
  end

  def down
    change_column :ndcs, :content_tsv, :text
  end
end
