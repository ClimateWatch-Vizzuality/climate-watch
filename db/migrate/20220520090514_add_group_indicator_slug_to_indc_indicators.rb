class AddGroupIndicatorSlugToIndcIndicators < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_indicators, :group_indicator_slug, :string
  end
end
