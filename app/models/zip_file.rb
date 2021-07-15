class ZipFile < ApplicationRecord
  include ActionView::Helpers::NumberHelper

  UPLOAD_PREFIX = 'climate-watch-download-zip'.freeze

  validates_presence_of :dropdown_title, :zip_filename

  def s3_key
    "#{CW_FILES_PREFIX}#{UPLOAD_PREFIX}/#{zip_filename}"
  end

  def url
    "#{s3_url}/#{s3_key}"
  end

  def size
    number_to_human_size(byte_size, precision: 2)
  end

  private

  def s3_url
    "https://#{Rails.application.secrets.s3_bucket_name}.s3.amazonaws.com"
  end
end
