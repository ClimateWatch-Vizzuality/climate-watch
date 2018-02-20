class Location < ApplicationRecord
  has_many :ndcs, dependent: :destroy
  has_many :location_members, dependent: :destroy
  has_many :members, through: :location_members
  has_many :historical_emissions,
           class_name: 'HistoricalEmissions::Record',
           dependent: :destroy
  has_many :values, class_name: 'Indc::Value'
  has_many :indicators,
           class_name: 'Indc::Indicator',
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
    sql = <<-SQL
      SELECT
        soci_pop.year AS population_year, soci_pop.population AS population,
        soci_pop.population_rank AS population_rank,

        soci_gdp.year AS gdp_year, soci_gdp.gdp AS gdp,
        soci_gdp.gdp_rank AS gdp_rank,

        soci_pop_growth.year AS population_growth_year,
        soci_pop_growth.population_growth AS population_growth,
        soci_pop_growth.population_growth_rank AS population_growth_rank,

        soci_gdp_per_capita.year AS gdp_per_capita_year,
        soci_gdp_per_capita.gdp_per_capita AS gdp_per_capita,
        soci_gdp_per_capita.gdp_per_capita_rank AS gdp_per_capita_rank

      FROM socioeconomic_indicators soci_pop,
           socioeconomic_indicators soci_gdp,
           socioeconomic_indicators soci_pop_growth,
           socioeconomic_indicators soci_gdp_per_capita

      WHERE soci_pop.location_id = soci_gdp.location_id
        AND soci_gdp.location_id = soci_pop_growth.location_id
        AND soci_pop_growth.location_id = soci_gdp_per_capita.location_id
        AND soci_pop.population <> 0 AND soci_pop.population IS NOT NULL
        AND soci_gdp.gdp <> 0 AND soci_gdp.gdp IS NOT NULL
        AND soci_pop_growth.population_growth <> 0
        AND soci_pop_growth.population_growth IS NOT NULL
        AND soci_gdp_per_capita.gdp_per_capita <> 0
        AND soci_gdp_per_capita.gdp_per_capita IS NOT NULL
        AND soci_pop.location_id = #{self.id}
      ORDER BY soci_pop.year DESC, soci_gdp.year DESC,
      soci_pop_growth.year DESC, soci_gdp_per_capita.year DESC
      LIMIT 1
    SQL

    result = ActiveRecord::Base.connection.execute(sql).first

    if !result
      return {}
    end

    {
      location: iso_code3,
      gdp_year: result["gdp_year"],
      gdp: result["gdp"],
      gdp_rank: result["gdp_rank"].try(:ordinalize),
      gdp_per_capita_year: result["gdp_per_capita_year"],
      gdp_per_capita: result["gdp_per_capita"],
      gdp_per_capita_rank: result["gdp_per_capita_rank"].try(:ordinalize),
      population_year: result["population_year"],
      population: result["population"],
      population_rank: result["population_rank"].try(:ordinalize),
      population_growth_year: result["population_growth_year"],
      population_growth: result["population_growth"],
      population_growth_rank: result["population_growth_rank"].try(:ordinalize)
    }
  end
end
