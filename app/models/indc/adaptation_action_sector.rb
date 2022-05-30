# == Schema Information
#
# Table name: indc_adaptation_action_sectors
#
#  id                   :bigint           not null, primary key
#  adaptation_action_id :bigint           not null
#  sector_id            :bigint           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
module Indc
  class AdaptationActionSector < ApplicationRecord
    belongs_to :adaptation_action, class_name: 'Indc::AdaptationAction'
    belongs_to :sector, class_name: 'Indc::Sector'
  end
end
