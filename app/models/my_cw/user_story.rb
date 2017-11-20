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
    belongs_to :user
    validates_presence_of :title
  end
end