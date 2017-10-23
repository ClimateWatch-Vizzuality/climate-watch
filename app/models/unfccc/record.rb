module Unfccc
  class Record < ApplicationRecord
    has_many :notes, class_name: 'Unfccc::Note'
    belongs_to :document, class_name: 'Unfccc::Document'
    belongs_to :location

    validates :link, presence: true
  end
end


