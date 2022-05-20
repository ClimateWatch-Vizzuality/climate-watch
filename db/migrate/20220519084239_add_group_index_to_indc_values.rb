class AddGroupIndexToIndcValues < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_values, :group_index, :integer
  end
end
