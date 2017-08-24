class Sdg < ApplicationRecord
  validates :number, presence: true, uniqueness: true
  validates :title, presence: true
  validates :cw_title, presence: true
end
