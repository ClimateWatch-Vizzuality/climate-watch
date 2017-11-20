# Class Vizualization
#
# Attributes
#
# title       :string
# description :text
# json_body   :jsonb
# user_id     :int
# timestamps

module MyCw
  class Vizualization < ApplicationRecord
    belongs_to :user
    validates_presence_of :title
  end
end