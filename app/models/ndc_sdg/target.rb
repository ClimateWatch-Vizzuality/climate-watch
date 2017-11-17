module NdcSdg
  class Target < ApplicationRecord
    belongs_to :goal, class_name: 'NdcSdg::Goal'
    has_many :ndc_targets,
             class_name: 'NdcSdg::NdcTarget'
    has_many :ndc_target_sectors,
             through: :ndc_targets
    has_many :sectors,
             through: :ndc_target_sectors
    validates :number, presence: true, uniqueness: true
    validates :title, presence: true

    def self.ndc_ids(target_number)
      Target.includes(:ndc_targets).
        find_by!(number: target_number).
        ndc_targets.
        map(&:ndc_id).
        uniq
    end
  end
end
