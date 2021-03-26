# == Schema Information
#
# Table name: notifications
#
#  id          :bigint           not null, primary key
#  description :text             not null
#  date        :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Notification < ApplicationRecord
  validates_presence_of :description, :date
end
