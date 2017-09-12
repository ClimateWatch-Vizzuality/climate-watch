class RemoveCaitIndcUnusedColumns < ActiveRecord::Migration[5.1]
  def change
    remove_column :cait_indc_indicators, :summary_list
    remove_column :cait_indc_indicators, :omit_from_detailed_view
    remove_column :cait_indc_indicators, :show_in_dashboard
    remove_column :cait_indc_indicators, :indicator_type_id
  end
end
