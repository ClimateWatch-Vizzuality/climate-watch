require 'csv'

module Api
  module V1
    module Data
      class NdcContentCsvContent
        def initialize(filter, output)
          @query = filter.call
          @headers = filter.class.column_aliases
          @output = output
        end

        def call
          @output << @headers.map(&:humanize).to_csv
          @query.each do |record|
            ary = @headers.map { |h| record[h] }
            @output << ary.to_csv
          end
        end
      end
    end
  end
end
