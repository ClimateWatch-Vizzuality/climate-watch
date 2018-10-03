module Admin
  class Section < ApplicationRecord
    belongs_to :platform, class_name: 'Admin::Platform'
    has_many :datasets, class_name: 'Admin::Dataset'
    has_many :worker_logs, class_name: 'Admin::WorkerLog'
    validates :name, presence: true
  end
end
