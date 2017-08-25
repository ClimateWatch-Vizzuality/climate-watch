class Sdg < ApplicationRecord
  has_many :sdg_targets, dependent: :destroy
  validates :number, presence: true, uniqueness: true
  validates :title, presence: true
  validates :cw_title, presence: true
end
