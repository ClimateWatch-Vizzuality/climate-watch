class ChangeNdcsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :ndcs, :document_type, :text, default: 'ndc'
    add_column :ndcs, :language, :text
  end
end
