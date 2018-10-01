module Admin
  class Section < ApplicationRecord
    belongs_to :platform, class_name: 'Admin::Platform'
    has_many :datasets, class_name: 'Admin::Dataset'
    validates :name, presence: true
  end
end
