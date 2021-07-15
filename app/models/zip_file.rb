class ZipFile < ApplicationRecord
  validates_presence_of :dropdown_title, :zip_filename

  def url
    "#{s3_url}/#{CW_FILES_PREFIX}climate-watch-download-zip/#{zip_filename}"
  end

  private

  def s3_url
    "https://#{Rails.application.secrets.s3_bucket_name}.s3.amazonaws.com"
  end
end
