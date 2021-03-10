# == Schema Information
#
# Table name: locations
#
#  id                   :bigint           not null, primary key
#  iso_code3            :text             not null
#  pik_name             :text
#  cait_name            :text
#  ndcp_navigators_name :text
#  wri_standard_name    :text             not null
#  unfccc_group         :text
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  iso_code2            :text             not null
#  location_type        :text             not null
#  show_in_cw           :boolean          default(TRUE)
#  topojson             :json
#  centroid             :jsonb
#  is_in_eu             :boolean
#
class Location < ApplicationRecord
  has_many :ndcs, dependent: :destroy
  has_many :location_members, dependent: :destroy
  has_many :members, through: :location_members
  has_many :historical_emissions,
           class_name: 'HistoricalEmissions::Record',
           dependent: :destroy
  has_many :data_sources,
           class_name: 'HistoricalEmissions::DataSource',
           through: :historical_emissions
  has_many :values, class_name: 'Indc::Value'
  has_many :indicators,
           class_name: 'Indc::Indicator',
           through: :values
  has_many :documents,
            class_name: 'Indc::Document',
            through: :values

  has_many :socioeconomic_indicators, class_name: 'Socioeconomic::Indicator'

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

  scope :countries, (-> { where(location_type: 'COUNTRY') })

  def populate_wri_standard_name
    self.wri_standard_name = [
      pik_name, cait_name, ndcp_navigators_name, iso_code3, iso_code2
    ].reject(&:blank?).first
  end

  def country?
    location_type == 'COUNTRY'
  end

  def latest_socioeconomics
    result = socioeconomic_indicators.latest_available_data_query

    if !result
      return {}
    end

    {
      location: iso_code3,
      gdp_year: result['gdp_year'],
      gdp: result['gdp'],
      gdp_rank: result['gdp_rank'].try(:ordinalize),
      gdp_per_capita_year: result['gdp_per_capita_year'],
      gdp_per_capita: result['gdp_per_capita'],
      gdp_per_capita_rank: result['gdp_per_capita_rank'].try(:ordinalize),
      population_year: result['population_year'],
      population: result['population'],
      population_rank: result['population_rank'].try(:ordinalize),
      population_growth_year: result['population_growth_year'],
      population_growth: result['population_growth'],
      population_growth_rank: result['population_growth_rank'].try(:ordinalize)
    }
  end
end
