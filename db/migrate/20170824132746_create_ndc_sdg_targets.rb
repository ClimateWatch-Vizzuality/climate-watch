class CreateNdcSdgTargets < ActiveRecord::Migration[5.1]
  def change
    create_table :ndc_sdg_targets do |t|
      t.references :ndc, foreign_key: true, index: true
      t.references :sdg_target, foreign_key: true, index: true
      t.text :indc_text
      t.text :status
      t.text :climate_response
      t.text :type_of_information

      t.timestamps
    end
  end
end
