module Timeline
  class Document < ApplicationRecord
    has_many :notes, class_name: 'Timeline::Note'
    belongs_to :source, class_name: 'Timeline::Source'
    belongs_to :location

    validates :link, presence: true
  end
end


