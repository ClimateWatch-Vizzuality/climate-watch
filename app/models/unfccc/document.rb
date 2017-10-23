module Unfccc
  class Document < ApplicationRecord
    has_many :records, class_name: 'Unfccc::Record'

    validates :name, presence: true
  end
end

