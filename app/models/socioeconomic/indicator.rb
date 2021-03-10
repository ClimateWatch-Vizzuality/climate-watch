# == Schema Information
#
# Table name: socioeconomic_indicators
#
#  id                     :bigint           not null, primary key
#  location_id            :bigint
#  year                   :integer          not null
#  gdp                    :bigint
#  gdp_rank               :integer
#  gdp_per_capita         :float
#  gdp_per_capita_rank    :integer
#  population             :bigint
#  population_rank        :integer
#  population_growth      :float
#  population_growth_rank :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
module Socioeconomic
  class Indicator < ApplicationRecord
    belongs_to :location
    validates :year, presence: true, uniqueness: {scope: :location_id}

    def self.latest_available_data_query
      select(<<-SQL
        socioeconomic_indicators.year AS population_year,
        socioeconomic_indicators.population AS population,
        socioeconomic_indicators.population_rank AS population_rank,
        soci_gdp.year AS gdp_year, soci_gdp.gdp AS gdp,
        soci_gdp.gdp_rank AS gdp_rank,
        soci_pop_growth.year AS population_growth_year,
        soci_pop_growth.population_growth AS population_growth,
        soci_pop_growth.population_growth_rank AS population_growth_rank,
        soci_gdp_per_capita.year AS gdp_per_capita_year,
        soci_gdp_per_capita.gdp_per_capita AS gdp_per_capita,
        soci_gdp_per_capita.gdp_per_capita_rank AS gdp_per_capita_rank
      SQL
            ).
        joins(<<-SQL
        INNER JOIN socioeconomic_indicators soci_gdp
        ON socioeconomic_indicators.location_id = soci_gdp.location_id
        AND soci_gdp.gdp <> 0
        AND soci_gdp.gdp IS NOT NULL
        INNER JOIN socioeconomic_indicators soci_pop_growth
        ON socioeconomic_indicators.location_id = soci_pop_growth.location_id
        AND soci_pop_growth.population_growth <> 0
        AND soci_pop_growth.population_growth IS NOT NULL
        INNER JOIN socioeconomic_indicators soci_gdp_per_capita
        ON socioeconomic_indicators.location_id = soci_gdp_per_capita.location_id
        AND soci_gdp_per_capita.gdp_per_capita <> 0
        AND soci_gdp_per_capita.gdp_per_capita IS NOT NULL
      SQL
             ).where.not(population: [0, nil]).
        order(Arel.sql(<<-SQL
          socioeconomic_indicators.year DESC,
          soci_gdp.year DESC, soci_pop_growth.year DESC,
          soci_gdp_per_capita.year DESC
        SQL
                      )).first
    end
  end
end
