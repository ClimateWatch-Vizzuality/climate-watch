# == Schema Information
#
# Table name: indc_labels
#
#  id           :bigint           not null, primary key
#  indicator_id :bigint           not null
#  value        :text             not null
#  index        :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  slug         :string
#
module Indc
  class Label < ApplicationRecord
    belongs_to :indicator, class_name: 'Indc::Indicator'
    has_many :indc_values, class_name: 'Indc::Value'

    validates :value, presence: true
    validates :index, presence: true
  end
end
