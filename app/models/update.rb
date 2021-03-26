# == Schema Information
#
# Table name: updates
#
#  id          :bigint           not null, primary key
#  category    :string
#  description :text
#  link        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Update < ApplicationRecord
end
