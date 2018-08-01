module Api
  module V1
    module Data
      class HistoricalEmissionsFilter
        include Api::V1::Data::SanitisedSorting
        include Api::V1::Data::ColumnHelpers
        attr_reader :years

        # @param params [Hash]
        # @option params [Array<String>] :regions
        # @option params [Array<Integer>] :source_ids
        # @option params [Array<Integer>] :gwp_ids
        # @option params [Array<Integer>] :gas_ids
        # @option params [Array<Integer>] :sector_ids
        # @option params [String] :sort_col
        # @option params [String] :sort_dir
        def initialize(params)
          initialize_filters(params)
          initialise_sorting(params[:sort_col], params[:sort_dir])
          @query = ::HistoricalEmissions::Record.all
          @years_query = ::HistoricalEmissions::NormalisedRecord.all
        end

        def call
          @query = apply_filters(@query)
          @years_query = apply_filters(@years_query)
          # rubocop:disable Style/IfUnlessModifier
          if @start_year
            @years_query = @years_query.where('year >= ?', @start_year)
          end
          if @end_year
            @years_query = @years_query.where('year <= ?', @end_year)
          end
          # rubocop:enable Style/IfUnlessModifier
          @years = @years_query.distinct(:year).pluck(:year).sort

          results = @query.
            joins(:location, :data_source, :gwp, :sector, :gas).
            select(select_columns).
            group(group_columns).
            order(sanitised_order)

          results
        end

        private

        # rubocop:disable Metrics/MethodLength
        def select_columns_map
          [
            {
              column: 'id',
              alias: 'id'
            },
            {
              column: 'locations.iso_code3',
              alias: 'iso_code3'
            },
            {
              column: 'locations.wri_standard_name',
              alias: 'region'
            },
            {
              column: 'historical_emissions_data_sources.name',
              alias: 'data_source'
            },
            {
              column: 'historical_emissions_gwps.name',
              alias: 'gwp'
            },
            {
              column: 'historical_emissions_sectors.name',
              alias: 'sector'
            },
            {
              column: 'historical_emissions_gases.name',
              alias: 'gas'
            },
            {
              column: "'MtCO\u2082e'::TEXT",
              alias: 'unit',
              order: false,
              group: false
            },
            {
              column: emissions_select_column,
              alias: 'emissions',
              order: false,
              group: false
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

        def apply_filters(query)
          query = query.where(data_source_id: @source_ids) if @source_ids
          query = query.where(gwp_id: @gwp_ids) if @gwp_ids
          query = query.where(gas_id: @gas_ids) if @gas_ids
          query = apply_location_filter(query)
          query = apply_sector_filter(query)
          query
        end

        def apply_sector_filter(query)
          return query unless @sector_ids
          top_level_sector_ids = ::HistoricalEmissions::Sector.
            where(parent_id: nil, id: @sector_ids).
            pluck(:id)
          subsector_ids = @sector_ids +
            ::HistoricalEmissions::Sector.where(
              parent_id: top_level_sector_ids
            ).pluck(:id)

          query.where(sector_id: subsector_ids)
        end

        def apply_location_filter(query)
          return query unless @location_ids
          top_level_location_ids = Location.
            where("location_type <> 'COUNTRY'").
            where(id: @location_ids).
            pluck(:id)
          sublocation_ids = @location_ids + Location.
            where(id: top_level_location_ids).
            joins(:location_members).
            pluck(:member_id)

          query.where(location_id: sublocation_ids)
        end
      end
    end
  end
end
