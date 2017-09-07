class Location < ApplicationRecord
  has_many :ndcs, dependent: :destroy
  has_many :location_members, dependent: :destroy
  has_many :members, through: :location_members
  has_many :historical_emissions,
           class_name: 'HistoricalEmissions::Record',
           dependent: :destroy
  has_many :values, class_name: 'CaitIndc::Value'
  has_many :indicators,
           class_name: 'CaitIndc::Indicator',
           through: :values
  has_one :location_datum,
          class_name: 'CaitIndc::LocationDatum'

  validates :iso_code3, presence: true, uniqueness: true
  validates :iso_code2, presence: true, uniqueness: true, if: proc { |l|
    l.show_in_cw? && l.country?
  }
  validates :wri_standard_name, presence: true, if: proc { |l| l.show_in_cw? }
  validates :location_type, presence: true, inclusion: {
    in: %w(COUNTRY REGION GROUP)
  }

  before_validation :populate_wri_standard_name, if: proc { |l|
    l.wri_standard_name.blank?
  }

  def populate_wri_standard_name
    self.wri_standard_name = [
      pik_name, cait_name, ndcp_navigators_name, iso_code3, iso_code2
    ].reject(&:blank?).first
  end

  def country?
    location_type == 'COUNTRY'
  end
end
