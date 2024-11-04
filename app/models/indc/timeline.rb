# == Schema Information
#
# Table name: indc_timelines
#
#  id          :bigint           not null, primary key
#  location_id :bigint           not null
#  submission  :string
#  date        :date
#  url         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
module Indc
  class Timeline < ApplicationRecord
    belongs_to :location

    def date=(val)
      val = Date.strptime(val, '%m/%d/%y') if val.is_a?(String)
      write_attribute :date, val
    end
  end
end
