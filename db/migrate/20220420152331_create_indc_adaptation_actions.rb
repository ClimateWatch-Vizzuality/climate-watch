class CreateIndcAdaptationActions < ActiveRecord::Migration[5.2]
  def change
    create_table :indc_adaptation_actions do |t|
      t.references :location, foreign_key: {
        to_table: :locations,
        on_delete: :cascade
      }, null: false
      t.references :document, foreign_key: {
        to_table: :indc_documents,
        on_delete: :cascade
      }, null: false
      t.text :title, null: false
    end

    create_table :indc_adaptation_action_sectors do |t|
      t.references :adaptation_action, foreign_key: {
        to_table: :indc_adaptation_actions,
        on_delete: :cascade
      }, null: false
      t.references :sector, foreign_key: {
        to_table: :indc_sectors,
        on_delete: :cascade
      }, null: false

      t.index [:adaptation_action_id, :sector_id], unique: true, name: 'index_indc_adapt_action_sectors_on_action_id_and_sector_id'

      t.timestamps
    end
  end
end
