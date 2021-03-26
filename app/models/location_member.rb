# == Schema Information
#
# Table name: location_members
#
#  id          :bigint           not null, primary key
#  location_id :bigint
#  member_id   :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class LocationMember < ApplicationRecord
  belongs_to :location
  belongs_to :member, class_name: 'Location', foreign_key: :member_id
end
