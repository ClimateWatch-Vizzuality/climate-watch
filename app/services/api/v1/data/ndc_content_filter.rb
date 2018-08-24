module Api
  module V1
    module Data
      class NdcContentFilter
        include Api::V1::Data::SanitisedSorting
        include Api::V1::Data::ColumnHelpers

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
          @query = ::Indc::Value.all
        end

        def call
          apply_filters
          @query = @query.
            select(select_columns).
            joins(:location, indicator: :source).
            joins('LEFT JOIN indc_sectors ON sector_id = indc_sectors.id').
            group(group_columns).
            order(sanitised_order)
          [
            ::Indc::CategoryType::GLOBAL, ::Indc::CategoryType::OVERVIEW
          ].each.with_index do |name, idx|
            category_type = ::Indc::CategoryType.find_by_name(name)
            @query = @query.joins(
              <<~SQL
              LEFT JOIN (
                SELECT ic.category_id, ic.indicator_id, c.name
                FROM indc_indicators_categories ic
                JOIN indc_categories c ON ic.category_id = c.id
                WHERE c.category_type_id = #{category_type&.id}
              ) #{name}_categories ON #{name}_categories.indicator_id = indc_indicators.id
              SQL
            )
          end
          @query
        end

        def meta
          sorting_manifest.merge(column_manifest)
        end

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
              alias: 'iso_code3'
            },
            {
              column: 'locations.wri_standard_name',
              alias: 'country'
            },
            {
              column: 'indc_indicators.name',
              alias: 'indicator'
            },
            {
              column: 'indc_indicators.slug',
              alias: 'short_name'
            },
            {
              column: 'indc_sources.name',
              alias: 'source'
            },
            {
              column: 'indc_sectors.name',
              alias: 'sector'
            },
            {
              column: 'indc_values.value',
              alias: 'value'
            },
            {
              # rubocop:disable Metrics/LineLength
              column: "ARRAY_TO_STRING(ARRAY_AGG(DISTINCT global_categories.name), ', ')",
              # rubocop:enable Metrics/LineLength
              alias: 'global_category',
              order: false,
              group: false
            },
            {
              # rubocop:disable Metrics/LineLength
              column: "ARRAY_TO_STRING(ARRAY_AGG(DISTINCT overview_categories.name), ', ')",
              # rubocop:enable Metrics/LineLength
              alias: 'overview_category',
              order: false,
              group: false
            }
          ]
        end
        # rubocop:enable Metrics/MethodLength

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
        end

        def apply_filters
          apply_location_filter
          if @source_ids
            @query = @query.where(
              'indc_indicators.source_id' => @source_ids
            )
          end
          @query = @query.where(indicator_id: @indicator_ids) if @indicator_ids
          apply_sector_filter
          apply_category_filter
        end

        def apply_location_filter
          return unless @countries
          @query = @query.where(
            'locations.iso_code3' => @countries
          )
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
            'overview_categories.category_id' => subcategory_ids
          )
        end
      end
    end
  end
end
