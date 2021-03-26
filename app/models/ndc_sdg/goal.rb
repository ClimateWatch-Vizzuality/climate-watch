# == Schema Information
#
# Table name: ndc_sdg_goals
#
#  id         :bigint           not null, primary key
#  number     :text             not null
#  title      :text             not null
#  cw_title   :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  colour     :text             not null
#
module NdcSdg
  class Goal < ApplicationRecord
    has_many :targets, class_name: 'NdcSdg::Target', dependent: :destroy

    validates :number, presence: true, uniqueness: true
    validates :title, presence: true
    validates :cw_title, presence: true

    def self.ndc_ids(goal_number)
      Goal.includes(targets: :ndc_targets).
        find_by!(number: goal_number).
        targets.
        flat_map(&:ndc_targets).
        map(&:ndc_id).
        uniq
    end
  end
end
