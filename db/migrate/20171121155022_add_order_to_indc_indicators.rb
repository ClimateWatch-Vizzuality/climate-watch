class AddOrderToIndcIndicators < ActiveRecord::Migration[5.1]
  def change
    add_column :indc_indicators, :order, :integer
  end
end
