class AddLabelIndexToCaitIndcLabel < ActiveRecord::Migration[5.1]
  def change
    add_column :cait_indc_labels, :index, :integer
  end
end
