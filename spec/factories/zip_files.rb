# == Schema Information
#
# Table name: zip_files
#
#  id             :bigint           not null, primary key
#  dropdown_title :string           not null
#  zip_filename   :string           not null
#  byte_size      :bigint
#  metadata       :string           default([]), is an Array
#  files          :jsonb
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
FactoryBot.define do
  factory :zip_file do
    dropdown_title { 'title' }
    zip_filename { 'file.zip' }
    metadata { %w(metadata1 metadata2) }
    files {
      [
        {s3_folder: 'folder', filename_original: 'filename.csv', filename_zip: 'new_filename.csv'},
        {s3_folder: 'folder', filename_original: 'filename2.csv', filename_zip: 'new_filename2.csv'}
      ]
    }
  end
end
