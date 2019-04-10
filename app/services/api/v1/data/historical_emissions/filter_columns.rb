module Api
  module V1
    module Data
      module HistoricalEmissions
        module FilterColumns
          extend ActiveSupport::Concern

          private

          # rubocop:disable Metrics/MethodLength
          def select_columns_map
            [
              {
                column: 'historical_emissions_records.id',
                alias: 'id',
                visible: false
              },
              {
                column: 'iso_code3',
                alias: 'iso_code3',
                visible: false
              },
              {
                column: 'region',
                alias: 'country'
              },
              {
                column: 'data_source',
                alias: 'data_source'
              },
              {
                column: 'sector',
                alias: 'sector'
              },
              {
                column: 'gas',
                alias: 'gas'
              },
              {
                column: "'MtCO\u2082e'::TEXT",
                alias: 'unit',
                order: false
              },
              {
                column: emissions_select_column,
                alias: 'emissions',
                order: false,
                visible: false
              }
            ]
          end
          # rubocop:enable Metrics/MethodLength

          def emissions_select_column
            return 'emissions' unless @start_year || @end_year
            args_str = [
              'emissions',
              (@start_year || 'NULL').to_s + '::INT',
              (@end_year || 'NULL').to_s + '::INT'
            ].join(', ')
            "emissions_filter_by_year_range(#{args_str})::JSONB"
          end
        end
      end
    end
  end
end
