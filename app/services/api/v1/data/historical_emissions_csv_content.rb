require 'csv'

module Api
  module V1
    module Data
      class HistoricalEmissionsCsvContent
        def initialize(filter, output)
          @grouped_query = filter.call
          # FIXME: To remove id and emissions: Should this be here?
          @headers = filter.column_aliases[1...-1]
          @years = filter.years
          @output = output
        end

        def call
          @output << (@headers.map(&:humanize) + @years).to_csv
          @grouped_query.each do |record|
            ary = @headers.map { |h| record[h] }
            ary += @years.map do |y|
              emission = record.emissions.find { |e| e['year'] == y }
              (emission && emission['value']) || 'N/A'
            end
            @output << ary.to_csv
          end
        end
      end
    end
  end
end
