module HistoricalEmissions
  class EmissionsTransformation
    attr_reader :transformed_emissions

    def initialize(emissions)
      @transformed_emissions = emissions
    end

    def filter(start_year, end_year)
      @transformed_emissions = @transformed_emissions.select do |e|
        (start_year ? e['year'] >= start_year : true) &&
          (end_year ? e['year'] <= end_year : true)
      end
      self
    end

    def pivot
      pivoted_emissions = @transformed_emissions.map do |e|
        [e['year'], e['value']]
      end
      @transformed_emissions = Hash[pivoted_emissions]
      self
    end
  end
end
