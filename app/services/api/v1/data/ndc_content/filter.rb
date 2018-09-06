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
            @query = ::Indc::Value.all
          end

          def call
            apply_filters
            @query = @query.
              select(select_columns).
              joins(:location, indicator: :source).
              group(group_columns).
              order(sanitised_order)
            join_sectors
            join_categories
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
          end

          def join_sectors
            # rubocop:disable Metrics/LineLength
            subsectors_subquery = 'SELECT id, parent_id, name FROM indc_sectors WHERE parent_id IS NOT NULL'
            sectors_subquery = 'SELECT id, parent_id, name FROM indc_sectors WHERE parent_id IS NULL'
            @query = @query.
              joins("LEFT JOIN (#{subsectors_subquery}) subsectors ON sector_id = subsectors.id").
              joins("LEFT JOIN (#{sectors_subquery}) sectors ON sector_id = sectors.id").
              joins("LEFT JOIN (#{sectors_subquery}) parent_sectors ON subsectors.parent_id = parent_sectors.id")
            # rubocop:enable Metrics/LineLength
          end

          def join_categories
            [
              ::Indc::CategoryType::GLOBAL, ::Indc::CategoryType::OVERVIEW
            ].each do |name|
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
end
