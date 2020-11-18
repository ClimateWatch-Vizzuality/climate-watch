class AddPreviewImageUrlToKeyVisualizations < ActiveRecord::Migration[5.2]
  def change
    add_column :key_visualizations, :preview_image_url, :text
  end
end
