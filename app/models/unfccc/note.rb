module Unfccc
  class Note < ApplicationRecord
    belongs_to :record, class_name: 'Unfccc::Record'

    validates :note, presence: true
  end
end



