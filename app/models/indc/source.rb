# == Schema Information
#
# Table name: indc_sources
#
#  id         :bigint           not null, primary key
#  name       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
module Indc
  class Source < ApplicationRecord
    validates :name, presence: true
    validates :name, uniqueness: true
    scope :lts, -> { where("name ilike 'LTS'") }
    scope :net_zero, -> { where("name ilike 'ECIU'") }
    scope :ndc, -> { where.not(id: lts).where.not(id: net_zero) }
  end
end
