class ChangeCaitIndcIndicators < ActiveRecord::Migration[5.1]
  def change
    remove_reference :cait_indc_indicators, :category
  end
end
