class SdgTarget < ApplicationRecord
  belongs_to :sdg

  validates :number, presence: true, uniqueness: true
  validates :title, presence: true
end
