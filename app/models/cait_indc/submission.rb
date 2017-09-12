module CaitIndc
  class Submission < ApplicationRecord
    belongs_to :location
    validates :submission_type, presence: true
    validates :language, presence: true
    validates :submission_date, presence: true
    validates :url,
              presence: true,
              format: URI::regexp(['http', 'https'])

    def submission_date=(val)
      parts = val.split('/')
      write_attribute :submission_date, "#{parts[1]}-#{parts[0]}-#{parts[2]}"
    end
  end
end
