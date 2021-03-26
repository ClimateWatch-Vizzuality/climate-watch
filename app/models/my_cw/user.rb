# == Schema Information
#
# Table name: users
#
#  id           :bigint           not null, primary key
#  ct_id        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  organization :string
#  first_name   :string
#  last_name    :string
#  country      :string
#  sector       :string
#  data_usage   :text
#  tester       :boolean
#
module MyCw
  class User < ApplicationRecord
    validates_presence_of :ct_id
    validates_uniqueness_of :ct_id
  end
end
