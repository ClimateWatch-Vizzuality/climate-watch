module Api
  module V1
    module Data
      module NdcContent
        class Filter
          include Api::V1::Data::SanitisedSorting
          include Api::V1::Data::ColumnHelpers
          include Api::V1::Data::NdcContent::FilterColumns

          # @param params [Hash]
          # @option params [Array<String>] :countries
          # @option params [Array<Integer>] :source_ids
          # @option params [Array<Integer>] :indicator_ids
          # @option params [Array<Integer>] :category_ids
          # @option params [Array<Integer>] :sector_ids
          # @option params [String] :sort_col
          # @option params [String] :sort_dir
          def initialize(params)
            initialize_filters(params)
            initialise_sorting(params[:sort_col], params[:sort_dir])
            @query = ::Indc::Value.
              from('indc_searchable_values indc_values').
              all
          end

          def call
            apply_filters
            @query = @query.
              select(select_columns).
              order(sanitised_order)
            @query
          end

          def meta
            sorting_manifest.merge(column_manifest)
          end

          private

          def initialize_filters(params)
            # integer arrays
            [
              :source_ids, :indicator_ids, :category_ids, :sector_ids
            ].map do |param_name|
              if params[param_name].present? && params[param_name].is_a?(Array)
                value = params[param_name].map(&:to_i)
              end
              instance_variable_set(:"@#{param_name}", value)
            end
            @countries = params[:countries]
            initialize_locations(params)
          end

          # location filter overrides countries
          def initialize_locations(params)
            return unless params[:locations]

            @countries = Location.
              left_joins(:members).
              where(iso_code3: params[:locations]).
              pluck(Arel.sql('coalesce(members_locations.iso_code3, locations.iso_code3)')).
              uniq
          end

          def apply_filters
            apply_country_filter
            @query = @query.where(source_id: @source_ids) if @source_ids
            @query = @query.where(indicator_id: @indicator_ids) if @indicator_ids
            apply_sector_filter
            apply_category_filter
          end

          def apply_country_filter
            return unless @countries

            @query = @query.where(iso_code3: @countries)
          end

          def apply_location_filter
            return unless @locations

            @query = @query.where(iso_code3: @countries)
          end

          def apply_sector_filter
            return unless @sector_ids

            top_level_sector_ids = ::Indc::Sector.
              where(parent_id: nil, id: @sector_ids).
              pluck(:id)
            subsector_ids = @sector_ids +
              ::Indc::Sector.where(
                parent_id: top_level_sector_ids
              ).pluck(:id)
            @query = @query.where(sector_id: subsector_ids)
          end

          def apply_category_filter
            return unless @category_ids

            top_level_category_ids = ::Indc::Category.
              where(parent_id: nil, id: @category_ids).
              pluck(:id)
            subcategory_ids = @category_ids +
              ::Indc::Category.where(
                parent_id: top_level_category_ids
              ).pluck(:id)

            @query = @query.where(
              'overview_categories_ids && ARRAY[?]', subcategory_ids
            )
          end
        end
      end
    end
  end
end
