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
                column: 'indc_sources.name', alias: 'source', visible: false
              },
              {
                column: 'locations.iso_code3', alias: 'iso_code3', visible: false
              },
              {
                column: 'locations.wri_standard_name', alias: 'country'
              },
              {
                column: "ARRAY_TO_STRING(ARRAY_AGG(DISTINCT global_categories.name), ', ')",
                alias: 'global_category',
                order: false,
                group: false
              },
              {
                column: "ARRAY_TO_STRING(ARRAY_AGG(DISTINCT overview_categories.name), ', ')",
                alias: 'overview_category',
                order: false,
                group: false
              },
              {
                column: "COALESCE(sectors.name, parent_sectors.name, 'Economy-wide')",
                alias: 'sector'
              },
              {
                column: "COALESCE(subsectors.name, 'Economy-wide')",
                alias: 'subsector'
              },
              {
                column: 'indc_indicators.slug',
                alias: 'indicator_slug',
                display: 'Indicator ID'
              },
              {
                column: 'indc_indicators.name',
                alias: 'indicator_name'
              },
              {
                column: 'indc_values.value',
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
