require 'csv'

module Api
  module V1
    module Data
      module NdcSdg
        class CsvContent
          def initialize(filter)
            @query = filter.call
            @headers = filter.column_display_names
            @aliases = filter.column_aliases
          end

          def call
            CSV.generate do |output|
              output << @headers
              @query.each do |record|
                ary = @aliases.map { |h| record[h] }
                output << ary
              end
            end
          end
        end
      end
    end
  end
end
