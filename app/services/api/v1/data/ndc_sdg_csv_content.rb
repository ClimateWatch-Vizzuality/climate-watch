require 'csv'

module Api
  module V1
    module Data
      class NdcSdgCsvContent
        def initialize(filter)
          @query = filter.call
          @headers = filter.class.column_aliases
        end

        def call
          CSV.generate do |csv|
            csv << @headers.map(&:humanize)
            @query.each do |record|
              ary = @headers.map { |h| record[h] }
              csv << ary
            end
          end
        end
      end
    end
  end
end
