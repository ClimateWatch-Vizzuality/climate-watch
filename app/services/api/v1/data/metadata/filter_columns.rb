module Api
  module V1
    module Data
      module Metadata
        module FilterColumns
          extend ActiveSupport::Concern

          private

          def select_columns_map
            [
              {
                column: 'id', alias: 'id', visible: false
              },
              {
                column: 'wri_metadata_sources.name', alias: 'source'
              },
              {
                column: 'wri_metadata_properties.name', alias: 'property'
              },
              {
                column: 'wri_metadata_values.value', alias: 'value'
              }
            ]
          end
        end
      end
    end
  end
end
