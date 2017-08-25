class LocationMember < ApplicationRecord
  belongs_to :location
  belongs_to :member, class_name: 'Location', foreign_key: :member_id
end
