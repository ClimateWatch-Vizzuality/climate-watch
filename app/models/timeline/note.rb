# == Schema Information
#
# Table name: timeline_notes
#
#  id          :bigint           not null, primary key
#  document_id :bigint
#  note        :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
module Timeline
  class Note < ApplicationRecord
    belongs_to :document, class_name: 'Timeline::Document'

    validates :note, presence: true
  end
end
