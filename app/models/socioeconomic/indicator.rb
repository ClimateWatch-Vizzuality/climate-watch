module Socioeconomic
  class Indicator < ApplicationRecord
    belongs_to :location
    validates :year, presence: true, uniqueness: {scope: :location_id}

    def self.latest_available_data_query(location_id)
      <<-SQL
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

        FROM socioeconomic_indicators soci_pop
        INNER JOIN socioeconomic_indicators soci_gdp
          ON soci_pop.location_id = soci_gdp.location_id
          AND soci_gdp.gdp <> 0
          AND soci_gdp.gdp IS NOT NULL
        INNER JOIN socioeconomic_indicators soci_pop_growth
          ON soci_pop.location_id = soci_pop_growth.location_id
          AND soci_pop_growth.population_growth <> 0
          AND soci_pop_growth.population_growth IS NOT NULL
        INNER JOIN socioeconomic_indicators soci_gdp_per_capita
          ON soci_pop.location_id = soci_gdp_per_capita.location_id
          AND soci_gdp_per_capita.gdp_per_capita <> 0
          AND soci_gdp_per_capita.gdp_per_capita IS NOT NULL

        WHERE soci_pop.population <> 0 AND soci_pop.population IS NOT NULL
          AND soci_pop.location_id = #{location_id}
        ORDER BY soci_pop.year DESC, soci_gdp.year DESC,
        soci_pop_growth.year DESC, soci_gdp_per_capita.year DESC
        LIMIT 1
      SQL
    end
  end
end
