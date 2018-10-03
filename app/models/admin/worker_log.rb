module Admin
  class WorkerLog < ApplicationRecord
    belongs_to :section, class_name: 'Admin::Section'

    enum state: {
      started: 1,
      finished: 2,
      failed: 3,
      dead: 4
    }
  end
end
