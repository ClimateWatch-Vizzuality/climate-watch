module Api
  module V1
    module Data
      module NdcContent
        module FilterColumns
          extend ActiveSupport::Concern

          private

          # rubocop:disable Metrics/MethodLength
          def select_columns_map
            [
              {
                column: 'id', alias: 'id', visible: false
              },
              {
                column: 'source', alias: 'source', visible: false
              },
              {
                column: 'iso_code3', alias: 'iso_code3', visible: false
              },
              {
                column: 'country', alias: 'country'
              },
              {
                column: 'global_category',
                alias: 'global_category',
                order: false,
                group: false
              },
              {
                column: 'overview_category',
                alias: 'overview_category',
                order: false,
                group: false
              },
              {
                column: 'sector',
                alias: 'sector'
              },
              {
                column: 'subsector',
                alias: 'subsector'
              },
              {
                column: 'indicator_slug',
                alias: 'indicator_slug',
                display: 'Indicator ID'
              },
              {
                column: 'indicator_name',
                alias: 'indicator_name'
              },
              {
                column: 'value',
                alias: 'value'
              }
            ]
          end
          # rubocop:enable Metrics/MethodLength
        end
      end
    end
  end
end
