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
    validates :url, presence: true, format: URI.regexp(%w(http https))

    def submission_date=(val)
      write_attribute :submission_date, Date.strptime(val, '%m/%d/%Y')
    end

    def self.latest_ndc_per_location
      query = <<~SQL
        (select * from
          (select row_number() over (partition by location_id order by submission_date desc), *
           from indc_submissions s
           inner join indc_documents d on d.id = s.document_id
           where d.is_ndc = true
          ) as temp
         where temp.row_number = 1
        ) as indc_submissions
      SQL

      from(query)
    end
  end
end
