module Api
  module V1
    module Data
      class HistoricalEmissionsFilter
        attr_reader :years

        # @param params [Hash]
        # @option params [Array<String>] :regions
        # @option params [Array<Integer>] :source_ids
        # @option params [Array<Integer>] :gwp_ids
        # @option params [Array<Integer>] :gas_ids
        # @option params [Array<Integer>] :sector_ids
        def initialize(params)
          initialize_filters(params)
          @query = ::HistoricalEmissions::Record.all
        end

        def call
          apply_filters
          years_query = ::HistoricalEmissions::Record.select(
            "ARRAY_AGG(DISTINCT (e->>'year')::INT) AS years"
          ).from(
            <<-SQL
              (#{@query.select('emissions').to_sql}) s
              CROSS JOIN LATERAL JSONB_ARRAY_ELEMENTS(#{emissions_select_column}) e (e)
            SQL
          )
          @years = years_query.any? && years_query[0]['years'] || []
          @query.
            joins(:location, :data_source, :gwp, :sector, :gas).
            select(select_columns).
            group(group_columns)
        end

        def column_aliases
          column_aliases = select_columns_with_aliases.map do |column, column_alias|
            column_alias || column
          end
          column_aliases.pop
          column_aliases
        end

        private

        def select_columns
          select_columns_with_aliases.map do |column, column_alias|
            if column_alias
              [column, 'AS', column_alias].join(' ')
            else
              column
            end
          end
        end

        def group_columns
          columns = select_columns_with_aliases.map(&:first)
          columns[0..columns.length - 3]
        end

        def select_columns_with_aliases
          [
            ['id'],
            ['locations.iso_code3', 'iso_code3'],
            ['locations.wri_standard_name', 'region'],
            ['historical_emissions_data_sources.name', 'data_source'],
            ['historical_emissions_gwps.name', 'gwp'],
            ['historical_emissions_sectors.name', 'sector'],
            ['historical_emissions_gases.name', 'gas'],
            ["'MtCO\u2082e'::TEXT", 'unit'],
            [emissions_select_column, 'emissions']
          ]
        end

        def emissions_select_column
          args_str = [
            'emissions',
            (@start_year || 'NULL').to_s + '::INT',
            (@end_year || 'NULL').to_s + '::INT'
          ].join(', ')
          "emissions_filter_by_year_range(#{args_str})::JSONB"
        end

        def initialize_filters(params)
          # integer arrays
          [
            :source_ids, :gwp_ids, :gas_ids, :sector_ids
          ].map do |param_name|
            if params[param_name].present? && params[param_name].is_a?(Array)
              value = params[param_name].map(&:to_i)
            end
            instance_variable_set(:"@#{param_name}", value)
          end
          # rubocop:disable Style/IfUnlessModifier
          if params[:regions]
            @location_ids = Location.where(iso_code3: params[:regions]).pluck(:id)
          end
          # rubocop:enable Style/IfUnlessModifier
          @start_year = params[:start_year]
          @end_year = params[:end_year]
        end

        def apply_filters
          @query = @query.where(data_source_id: @source_ids) if @source_ids
          @query = @query.where(gwp_id: @gwp_ids) if @gwp_ids
          @query = @query.where(gas_id: @gas_ids) if @gas_ids
          @query = @query.where(location_id: @location_ids) if @location_ids
          apply_sector_filter
        end

        def apply_sector_filter
          return unless @sector_ids
          top_level_sector_ids = ::HistoricalEmissions::Sector.
            where(parent_id: nil, id: @sector_ids).
            pluck(:id)
          subsector_ids = @sector_ids +
            ::HistoricalEmissions::Sector.where(
              parent_id: top_level_sector_ids
            ).pluck(:id)

          @query = @query.where(sector_id: subsector_ids)
        end
      end
    end
  end
end
