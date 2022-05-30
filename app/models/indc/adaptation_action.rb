# == Schema Information
#
# Table name: indc_adaptation_actions
#
#  id          :bigint           not null, primary key
#  location_id :bigint           not null
#  document_id :bigint           not null
#  title       :text             not null
#
module Indc
  class AdaptationAction < ApplicationRecord
    belongs_to :location
    belongs_to :document, class_name: 'Indc::Document'

    has_many :adaptation_action_sectors, class_name: 'Indc::AdaptationActionSector'
    has_and_belongs_to_many :sectors, join_table: :indc_adaptation_action_sectors

    validates :title, presence: true
  end
end
