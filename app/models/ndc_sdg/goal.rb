module NdcSdg
  class Goal < ApplicationRecord
    has_many :targets, class_name: 'NdcSdg::Target', dependent: :destroy

    validates :number, presence: true, uniqueness: true
    validates :title, presence: true
    validates :cw_title, presence: true
  end
end
