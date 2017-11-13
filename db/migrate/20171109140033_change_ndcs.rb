class ChangeNdcs < ActiveRecord::Migration[5.1]
  def change
    add_column :ndcs, :translated, :boolean, default: false
  end
end
