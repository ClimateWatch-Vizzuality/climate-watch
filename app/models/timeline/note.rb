module Timeline
  class Note < ApplicationRecord
    belongs_to :document, class_name: 'Timeline::Document'

    validates :note, presence: true
  end
end
