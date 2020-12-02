module Indc
  class Source < ApplicationRecord
    validates :name, presence: true
    validates :name, uniqueness: true
    scope :lts, -> { where("name ilike 'LTS'") }
    scope :net_zero, -> { where("name ilike 'ECIU'") }
    scope :ndc, -> { where.not(id: lts).where.not(id: net_zero) }
  end
end
