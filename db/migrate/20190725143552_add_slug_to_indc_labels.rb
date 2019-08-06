class AddSlugToIndcLabels < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_labels, :slug, :string, default: nil
  end
end
