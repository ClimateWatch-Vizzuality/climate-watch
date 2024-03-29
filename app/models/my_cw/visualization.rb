# == Schema Information
#
# Table name: visualizations
#
#  id          :bigint           not null, primary key
#  title       :string
#  description :text
#  json_body   :jsonb
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer
#

module MyCw
  class Visualization < ApplicationRecord
    belongs_to :user, optional: false
    validates_presence_of :title
  end
end
