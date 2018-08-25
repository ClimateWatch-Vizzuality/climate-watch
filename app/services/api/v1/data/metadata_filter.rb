module Api
  module V1
    module Data
      class MetadataFilter
        include Api::V1::Data::ColumnHelpers

        # @param params [Hash]
        # @option params [Array<String>] :source_names
        def initialize(params)
          initialize_filters(params)
          @query = ::WriMetadata::Source.
            joins(values: :property).
            order(:name)
        end

        def call
          apply_filters
          @query.select(select_columns)
        end

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

        def initialize_filters(params)
          return unless params[:source_names].present? &&
              params[:source_names].is_a?(Array)
          @source_names = params[:source_names]
        end

        def apply_filters
          @query = @query.where(name: @source_names) if @source_names
        end
      end
    end
  end
end
