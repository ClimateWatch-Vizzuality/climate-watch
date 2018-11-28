module Api
  module V1
    module Data
      module HistoricalEmissions
        class Filter
          include Api::V1::Data::SanitisedSorting
          include Api::V1::Data::ColumnHelpers
          include Api::V1::Data::HistoricalEmissions::FilterColumns
          attr_reader :header_years

          # @param params [Hash]
          # @option params [Array<String>] :regions
          # @option params [Array<Integer>] :source_ids
          # @option params [Array<Integer>] :gwp_ids
          # @option params [Array<Integer>] :gas_ids
          # @option params [Array<Integer>] :sector_ids
          # @option params [Integer] :start_year
          # @option params [Integer] :end_year
          # @option params [String] :sort_col
          # @option params [String] :sort_dir
          def initialize(params)
            initialize_filters(params)
            initialise_sorting(params[:sort_col], params[:sort_dir])
            @query = ::HistoricalEmissions::Record.
              from('historical_emissions_searchable_records historical_emissions_records').
              all
            @years_query = ::HistoricalEmissions::NormalisedRecord.all
          end

          def call
            @query = apply_filters(@query)
            @years_query = apply_filters(@years_query)
            @years = @years_query.distinct(:year).pluck(:year).sort.reverse
            @header_years = @years.dup
            @header_years.reject! { |y| y < @start_year } if @start_year
            @header_years.reject! { |y| y > @end_year } if @end_year

            results = @query.
              select(select_columns).
              order(sanitised_order)

            results
          end

          def year_value_column(year)
            "emissions_dict->'#{year}'"
          end

          def meta
            {
              years: @years,
              header_years: @header_years
            }.merge(sorting_manifest).merge(column_manifest)
          end

          private

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
            if params[:regions]
              @location_ids = Location.where(iso_code3: params[:regions]).
                pluck(:id)
            end
            @start_year = params[:start_year]&.to_i
            @end_year = params[:end_year]&.to_i
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

            query.where(sector_id: @sector_ids)
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
end
