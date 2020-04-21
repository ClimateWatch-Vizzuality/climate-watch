class AddMultipleVersionsToIndcIndicators < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_indicators, :multiple_versions, :boolean
  end
end
