class AddColourToNdcSdgGoals < ActiveRecord::Migration[5.1]
  def up
    add_column :ndc_sdg_goals, :colour, :text
    execute "UPDATE ndc_sdg_goals SET colour = '#000000'"
    change_column :ndc_sdg_goals, :colour, :text, null: false
  end

  def down
    remove_column :ndc_sdg_goals, :colour
  end
end
