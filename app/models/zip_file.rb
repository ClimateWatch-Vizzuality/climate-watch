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
class ZipFile < ApplicationRecord
  UPLOAD_PREFIX = 'climate-watch-download-zip'.freeze

  validates_presence_of :dropdown_title, :zip_filename

  def s3_key
    "#{CW_FILES_PREFIX}#{UPLOAD_PREFIX}/#{zip_filename}"
  end

  def url
    "#{s3_url}/#{s3_key}"
  end



  private

  def s3_url
    "https://#{Rails.application.secrets.s3_bucket_name}.s3.amazonaws.com"
  end
end
