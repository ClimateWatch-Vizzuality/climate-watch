module NdcSdg
  class Target < ApplicationRecord
    belongs_to :goal, class_name: 'NdcSdg::Goal'

    validates :number, presence: true, uniqueness: true
    validates :title, presence: true
  end
end
