# == Schema Information
#
# Table name: timeline_sources
#
#  id   :bigint           not null, primary key
#  name :text
#
module Timeline
  class Source < ApplicationRecord
    has_many :documents, class_name: 'Timeline::Document'

    validates :name, presence: true
  end
end
