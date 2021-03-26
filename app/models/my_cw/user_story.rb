# == Schema Information
#
# Table name: user_stories
#
#  id         :bigint           not null, primary key
#  title      :string
#  body       :jsonb
#  public     :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#
# Class UserStory
#
# Attributes
#
# title    :string
# body     :jsonb
# public   :bool
# user_id  :int
# timestamps

module MyCw
  class UserStory < ApplicationRecord
    belongs_to :user, optional: false
    validates_presence_of :title
  end
end
