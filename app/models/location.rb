class Location < ApplicationRecord
  has_many :ndcs
  has_many :location_members
  has_many :members, through: :location_members
  has_many :historical_emissions
  has_many :values, class_name: 'CaitIndc::Value'
  has_many :indicators,
           class_name: 'CaitIndc::Indicator',
           through: :values
  has_one :location_datum,
          class_name: 'CaitIndc::LocationDatum'

  validates :iso_code3, presence: true, uniqueness: true
  # TODO: not until data provided
  # validates :iso_code2, presence: true, uniqueness: true
  validates :wri_standard_name, presence: true, if: proc { |l| l.show_in_cw? }

  before_validation :populate_wri_standard_name, if: proc { |l|
    l.wri_standard_name.blank?
  }

  def populate_wri_standard_name
    self.wri_standard_name = [
      pik_name, cait_name, ndcp_navigators_name, iso_code3, iso_code2
    ].reject(&:blank?).first
  end
end
