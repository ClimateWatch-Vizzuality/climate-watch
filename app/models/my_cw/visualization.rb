# Class Visualization
#
# Attributes
#
# title       :string
# description :text
# json_body   :jsonb
# user_id     :int
# timestamps

module MyCw
  class Visualization < ApplicationRecord
    belongs_to :user, optional: false
    validates_presence_of :title
  end
end
