# == Schema Information
#
# Table name: indc_sectors
#
#  id         :bigint           not null, primary key
#  parent_id  :bigint
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module Indc
  class Sector < ApplicationRecord
    belongs_to :parent, class_name: 'Indc::Sector', optional: true
    has_many :children, class_name: 'Indc::Sector', foreign_key: :parent_id

    has_many :values, class_name: 'Indc::Value'

    validates :name, presence: true
  end
end
