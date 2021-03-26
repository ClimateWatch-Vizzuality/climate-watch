# == Schema Information
#
# Table name: quantification_labels
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module Quantification
  class Label < ApplicationRecord
    validates :name, presence: true, uniqueness: true
  end
end
