module Api
  module V1
    module Data
      class NdcContentFilter
        # @param params [Hash]
        # @option params [Array<String>] :countries
        # @option params [Array<Integer>] :source_ids
        # @option params [Array<Integer>] :indicator_ids
        # @option params [Array<Integer>] :category_ids
        # @option params [Array<Integer>] :label_ids
        # @option params [Array<Integer>] :sector_ids
        def initialize(params)
          initialize_filters(params)
          @query = ::Indc::Value.all
        end

        def call
          apply_filters
          @query.
            select(self.class.select_columns).
            joins(:location, indicator: [:source, :categories]).
            joins('LEFT JOIN indc_labels ON label_id = indc_labels.id').
            joins('LEFT JOIN indc_sectors ON sector_id = indc_sectors.id').
            group(self.class.group_columns).
            order(self.class.order_columns)
        end

        def self.order_columns
          ['indc_categories.order', 'indc_indicators.order']
        end

        def self.column_aliases
          select_columns_with_aliases.map do |column, column_alias|
            column_alias || column
          end
        end

        def self.select_columns
          select_columns_with_aliases.map do |column, column_alias|
            if column_alias
              [column, 'AS', column_alias].join(' ')
            else
              column
            end
          end
        end

        def self.group_columns
          columns = select_columns_with_aliases.map(&:first)
          columns[0..columns.length - 2] + order_columns
        end

        private

        private_class_method def self.select_columns_with_aliases
          [
            ['id'],
            ['locations.iso_code3', 'iso_code3'],
            ['locations.wri_standard_name', 'country'],
            ['indc_indicators.name', 'indicator'],
            ['indc_sources.name', 'source'],
            ['indc_labels.value', 'label'],
            ['indc_sectors.name', 'sector'],
            ['indc_values.value', 'value'],
            [
              "ARRAY_TO_STRING(ARRAY_AGG(indc_categories.name), ', ')",
              'categories'
            ]
          ]
        end

        def initialize_filters(params)
          # integer arrays
          [
            :source_ids, :indicator_ids, :category_ids, :label_ids, :sector_ids
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
          if @category_ids
            @query = @query.where(
              'indc_indicators_categories.category_id' => @category_ids
            )
          end
          @query = @query.where(label_id: @label_ids) if @label_ids
          apply_sector_filter
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
      end
    end
  end
end
