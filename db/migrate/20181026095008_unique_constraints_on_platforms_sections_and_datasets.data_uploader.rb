# This migration comes from data_uploader (originally 20181024100559)
class UniqueConstraintsOnPlatformsSectionsAndDatasets < ActiveRecord::Migration[5.2]
  def up
    execute 'ALTER TABLE datasets ADD CONSTRAINT datasets_section_id_name_key UNIQUE (section_id, name)'
    execute 'ALTER TABLE sections ADD CONSTRAINT sections_platform_id_name_key UNIQUE (platform_id, name)'
    execute 'ALTER TABLE platforms ADD CONSTRAINT platforms_name_key UNIQUE (name)'
  end

  def down
    execute 'ALTER TABLE datasets DROP CONSTRAINT datasets_section_id_name_key'
    execute 'ALTER TABLE sections DROP CONSTRAINT sections_platform_id_name_key'
    execute 'ALTER TABLE platforms DROP CONSTRAINT platforms_name_key'
  end
end
