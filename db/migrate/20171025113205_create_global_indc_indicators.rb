class CreateGlobalIndcIndicators < ActiveRecord::Migration[5.1]
  def change
    create_table :global_indc_indicators do |t|
      t.references :cait_indicator, foreign_key: {to_table: :cait_indc_indicators, on_delete: :cascade}
      t.references :wb_indicator, foreign_key: {to_table: :wb_indc_indicators, on_delete: :cascade}
      t.timestamp
    end
  end
end
