module Api
  module V1
    module Data
      module NdcSdg
        module FilterColumns
          extend ActiveSupport::Concern

          private

          # rubocop:disable Metrics/MethodLength
          def select_columns_map
            [
              {
                column: 'id',
                alias: 'id',
                visible: false
              },
              {
                column: 'locations.iso_code3',
                alias: 'iso_code3',
                display: 'ISO'
              },
              {
                column: 'locations.wri_standard_name',
                alias: 'country'
              },
              {
                column: "ndc_sdg_goals.number || '. ' || ndc_sdg_goals.title",
                alias: 'sdg',
                display: 'SDG'
              },
              {
                column: "ndc_sdg_targets.number || '. ' || ndc_sdg_targets.title",
                alias: 'sdg_target',
                display: 'SDG target'
              },
              {
                column: 'ndc_sdg_ndc_targets.indc_text',
                alias: 'indc_text'
              },
              {
                column: 'ndc_sdg_ndc_targets.status',
                alias: 'status'
              },
              {
                column: 'ndc_sdg_sectors.name',
                alias: 'sector'
              },
              {
                column: 'ndc_sdg_ndc_targets.climate_response',
                alias: 'climate_response'
              },
              {
                column: 'ndc_sdg_ndc_targets.type_of_information',
                alias: 'type_of_information'
              },
              {
                column: 'ndcs.document_type',
                alias: 'document_type',
                visible: false
              },
              {
                column: 'ndcs.language',
                alias: 'document_language',
                visible: false
              }
            ]
          end
          # rubocop:enable Metrics/MethodLength
        end
      end
    end
  end
end
