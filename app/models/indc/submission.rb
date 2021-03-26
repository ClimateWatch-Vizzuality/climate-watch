# == Schema Information
#
# Table name: indc_submissions
#
#  id              :bigint           not null, primary key
#  location_id     :bigint           not null
#  submission_type :text             not null
#  language        :text             not null
#  submission_date :date             not null
#  url             :text             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  document_id     :bigint
#
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
