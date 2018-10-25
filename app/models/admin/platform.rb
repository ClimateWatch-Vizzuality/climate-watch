module Admin
  class Platform < ApplicationRecord
    has_many :sections, class_name: 'Admin::Section'
    validates :name, presence: true
  end
end
