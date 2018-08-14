Location.class_eval do
  has_many :ndcs, dependent: :destroy
  has_many :historical_emissions,
           class_name: 'HistoricalEmissions::Record',
           dependent: :destroy
  has_many :values, class_name: 'Indc::Value'
  has_many :indicators,
           class_name: 'Indc::Indicator',
           through: :values
  has_many :socioeconomic_indicators, class_name: 'Socioeconomic::Indicator'

  def latest_socioeconomics
    result = socioeconomic_indicators.latest_available_data_query

    return {} unless result

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
