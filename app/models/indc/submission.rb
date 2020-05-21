module Indc
  class Submission < ApplicationRecord
    belongs_to :location
    belongs_to :document, class_name: 'Indc::Document', optional: true

    validates :submission_type, presence: true
    validates :language, presence: true
    validates :submission_date, presence: true
    validates :url,
              presence: true,
              format: URI.regexp(%w(http https))

    def submission_date=(val)
      write_attribute :submission_date, Date.strptime(val, '%m/%d/%Y')
    end
  end
end
