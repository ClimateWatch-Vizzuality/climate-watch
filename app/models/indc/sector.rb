# == Schema Information
#
# Table name: indc_sectors
#
#  id          :bigint           not null, primary key
#  parent_id   :bigint
#  name        :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  sector_type :string
#
module Indc
  class Sector < ApplicationRecord
    SECTOR_TYPES = %w[lts wb adapt_now].freeze

    belongs_to :parent, class_name: 'Indc::Sector', optional: true
    has_many :children, class_name: 'Indc::Sector', foreign_key: :parent_id

    has_many :values, class_name: 'Indc::Value'

    validates :name, presence: true
    validates :sector_type, inclusion: {in: SECTOR_TYPES}

    # just for sorting
    def name_general_first
      return "!#{name}" if name.downcase.include?('general')

      name
    end
  end
end
