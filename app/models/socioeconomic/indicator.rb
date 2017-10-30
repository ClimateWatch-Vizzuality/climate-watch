module Socioeconomic
  class Indicator < ApplicationRecord
    belongs_to :location
    validates :year, presence: true, uniqueness: {scope: :location_id}
  end
end
