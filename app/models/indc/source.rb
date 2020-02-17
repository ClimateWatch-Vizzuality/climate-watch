module Indc
  class Source < ApplicationRecord
    validates :name, presence: true
    validates :name, uniqueness: true
    scope :lts, -> { where("name ilike 'LTS'") }
    scope :non_lts, -> { where.not("name ilike 'LTS'") }
  end
end
