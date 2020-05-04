class AddNormalizedSlugAndNormalizedLabelToIndcIndicators < ActiveRecord::Migration[5.2]
  def change
    add_column :indc_indicators, :normalized_slug, :string
    add_column :indc_indicators, :normalized_label, :string
  end
end
