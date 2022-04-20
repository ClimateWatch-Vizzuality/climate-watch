module Indc
  class AdaptationAction < ApplicationRecord
    belongs_to :location
    belongs_to :document, class_name: 'Indc::Document'

    has_many :adaptation_action_sectors, class_name: 'Indc::AdaptationActionSector'
    has_and_belongs_to_many :sectors, join_table: :indc_adaptation_action_sectors

    validates :action, presence: true
  end
end
