module Api
  module V1
    module Data
      module SanitisedSorting
        extend ActiveSupport::Concern
        SORTING_DIRECTIONS = %w(ASC DESC).freeze
        DEFAULT_SORTING_DIRECTION = 'ASC'.freeze

        def sorting_manifest
          {sorting: {sort_col: @sorting_alias, sort_dir: @sorting_direction}}
        end

        private

        def sanitised_order
          @query.klass.send(
            :sanitize_sql_for_order,
            "#{@sorting_column} #{@sorting_direction}"
          )
        end

        # @param column [String] name of column; can be a year
        # @param direction [String] ASC / DESC
        def initialise_sorting(column, direction)
          @sorting_alias = sanitise_sorting_column(column)
          if @sorting_alias.nil? && column =~ /^\d{4}$/ &&
              respond_to?(:year_value_column)
            @sorting_alias = column
            @sorting_column = year_value_column(column)
          else
            @sorting_alias = default_sorting_column if @sorting_alias.nil?
            @sorting_column = alias_to_name(@sorting_alias)
          end
          @sorting_direction = sanitise_sorting_direction(direction)
          # rubocop:disable Naming/MemoizedInstanceVariableName
          @sorting_direction ||= DEFAULT_SORTING_DIRECTION
          # rubocop:enable Naming/MemoizedInstanceVariableName
        end

        def sanitise_sorting_column(column)
          return nil unless column.present?
          column = column.downcase
          # rubocop:disable Style/IfUnlessModifier
          if available_sorting_columns.include?(column)
            return column
          end
          # rubocop:enable Style/IfUnlessModifier
          nil
        end

        def sanitise_sorting_direction(direction)
          return nil unless direction
          direction = direction.upcase
          return direction if SORTING_DIRECTIONS.include?(direction)
          nil
        end

        def default_sorting_column
          if available_sorting_columns.include? 'iso_code3'
            'iso_code3'
          else
            available_sorting_columns.first
          end
        end

        def available_sorting_columns
          column_aliases
        end
      end
    end
  end
end
