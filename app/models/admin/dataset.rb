module Admin
  class Dataset < ApplicationRecord
    belongs_to :section, class_name: 'Admin::Section'
    has_one_attached :datafile
  end
end
