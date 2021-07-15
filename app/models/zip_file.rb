class ZipFile < ApplicationRecord
  validates_presence_of :dropdown_title, :zip_filename
end
