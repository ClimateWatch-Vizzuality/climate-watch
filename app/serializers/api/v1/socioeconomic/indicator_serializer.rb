module Api
  module V1
    module Socioeconomic
      class IndicatorSerializer < ActiveModel::Serializer
        attribute :location
        attribute :year
        attribute :gdp
        attribute :gdp_rank
        attribute :gdp_per_capita
        attribute :gdp_per_capita_rank
        attribute :population
        attribute :population_rank
        attribute :population_growth
        attribute :population_growth_rank

        def location
          object.location.iso_code3
        end

        def gdp_rank
          object.gdp_rank.try(:ordinalize)
        end

        def gdp_per_capita_rank
          object.gdp_per_capita_rank.try(:ordinalize)
        end

        def population_rank
          object.population_rank.try(:ordinalize)
        end

        def population_growth_rank
          object.population_growth_rank.try(:ordinalize)
        end
      end
    end
  end
end
