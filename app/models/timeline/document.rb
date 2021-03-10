# == Schema Information
#
# Table name: timeline_documents
#
#  id          :bigint           not null, primary key
#  source_id   :bigint
#  location_id :bigint
#  link        :text
#  text        :text
#  date        :date
#  language    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
module Timeline
  class Document < ApplicationRecord
    has_many :notes, class_name: 'Timeline::Note'
    belongs_to :source, class_name: 'Timeline::Source'
    belongs_to :location

    validates :link, presence: true
  end
end
