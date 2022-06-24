# == Schema Information
#
# Table name: quantification_values
#
#  id            :bigint           not null, primary key
#  location_id   :bigint
#  label_id      :bigint
#  year          :integer
#  first_value   :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  second_value  :float
#  document_slug :string
#
module Quantification
  class Value < ApplicationRecord
    belongs_to :label, class_name: 'Quantification::Label'
    belongs_to :location

    validates :year, presence: true
  end
end
