# == Schema Information
#
# Table name: ndc_sdg_ndc_targets
#
#  id                  :bigint           not null, primary key
#  ndc_id              :bigint
#  target_id           :bigint
#  indc_text           :text
#  status              :text
#  climate_response    :text
#  type_of_information :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  starts_at           :integer
#  ends_at             :integer
#
require 'csv'

module NdcSdg
  class NdcTarget < ApplicationRecord
    belongs_to :ndc
    belongs_to :target, class_name: 'NdcSdg::Target'
    has_many :ndc_target_sectors,
             class_name: 'NdcSdg::NdcTargetSector',
             dependent: :destroy
    has_many :sectors,
             class_name: 'NdcSdg::Sector',
             through: :ndc_target_sectors

    def self.to_csv
      attributes = %w{
        Country wri_standard_name iso_code3 Goal Target INDC_text Status
        Sector Climate_response Type_of_information text_starts_at
      }

      linkages = NdcSdg::NdcTarget.
        includes(:sectors, ndc: :location, target: :goal).
        order('locations.wri_standard_name asc').
        all

      CSV.generate(headers: true) do |csv|
        csv << attributes

        linkages.each do |l|
          csv << attributes.map { |attr| get_attribute(l, attr) }
        end
      end
    end

    # rubocop:disable AbcSize
    private_class_method def self.get_attribute(linkage, attribute)
      attr_map = {
        'Country' => -> { linkage.ndc.location.wri_standard_name },
        'wri_standard_name' => -> { linkage.ndc.location.wri_standard_name },
        'iso_code3' => -> { linkage.ndc.location.iso_code3 },
        'Goal' => -> { "Goal #{linkage.target.goal.number} - #{linkage.target.goal.title}" },
        'Target' => -> { linkage.target.number },
        'INDC_text' => -> { linkage.indc_text },
        'Status' => -> { linkage.status },
        'Sector' => -> { linkage.sectors.map(&:name).join(' }, ') },
        'Climate_response' => -> { linkage.climate_response },
        'Type_of_information' => -> { linkage.type_of_information },
        'text_starts_at' => -> { linkage.starts_at }
      }

      return unless attr_map.key?(attribute)

      attr_map[attribute].call
    end
    # rubocop:enable AbcSize
  end
end
