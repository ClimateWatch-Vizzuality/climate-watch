module Timeline
  class Source < ApplicationRecord
    has_many :documents, class_name: 'Timeline::Document'

    validates :name, presence: true
  end
end
