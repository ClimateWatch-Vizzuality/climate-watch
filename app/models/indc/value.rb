# == Schema Information
#
# Table name: indc_values
#
#  id           :bigint           not null, primary key
#  indicator_id :bigint           not null
#  location_id  :bigint           not null
#  sector_id    :bigint
#  label_id     :bigint
#  value        :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  document_id  :bigint
#
module Indc
  class Value < ApplicationRecord
    belongs_to :location
    belongs_to :indicator, class_name: 'Indc::Indicator'
    belongs_to :label, class_name: 'Indc::Label', optional: true
    belongs_to :sector, class_name: 'Indc::Sector', optional: true
    belongs_to :document, class_name: 'Indc::Document', optional: true

    validates :value, presence: true
  end
end
