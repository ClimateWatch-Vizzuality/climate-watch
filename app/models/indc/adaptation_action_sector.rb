module Indc
  class AdaptationActionSector < ApplicationRecord
    belongs_to :adaptation_action, class_name: 'Indc::AdaptationAction'
    belongs_to :sector, class_name: 'Indc::Sector'
  end
end
